export interface ContributionDay {
  date: string;
  level: number;
  count: number;
  week: number;
  weekday: number;
}

/**
 * Lit au build le calendrier public des contributions GitHub.
 * Renvoie null si GitHub ne répond pas : la carte est alors omise, sans faire échouer le build.
 */
export async function getContributions(user: string) {
  try {
    const response = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { 'User-Agent': 'sftss.github.io build' },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return null;
    const html = await response.text();

    const counts = new Map<string, number>();
    for (const [, id, label] of html.matchAll(/<tool-tip[^>]*for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      counts.set(id, Number(label.match(/^(\d+) contribution/)?.[1] ?? 0));
    }

    const days: ContributionDay[] = [];
    for (const [tag] of html.matchAll(/<td[^>]*data-date="[^"]+"[^>]*>/g)) {
      const date = tag.match(/data-date="([^"]+)"/)?.[1];
      const id = tag.match(/id="(contribution-day-component-(\d+)-(\d+))"/);
      const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0);
      if (!date || !id) continue;
      days.push({ date, level, count: counts.get(id[1]) ?? 0, weekday: Number(id[2]), week: Number(id[3]) });
    }
    if (days.length < 300) return null;

    days.sort((a, b) => a.date.localeCompare(b.date));
    return {
      days,
      weeks: Math.max(...days.map((day) => day.week)) + 1,
      total: days.reduce((sum, day) => sum + day.count, 0),
      active: days.filter((day) => day.count > 0).length,
      from: days[0].date,
      to: days[days.length - 1].date,
    };
  } catch {
    return null;
  }
}
