import musicOrderRaw from '../../music_order.txt?raw';

const trackModules = import.meta.glob('../../music/*.{mp3,wav,ogg,m4a,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const trackOrder = musicOrderRaw
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .map((filename) => filename.replace(/\.[^.]+$/, '').toLowerCase());

const orderIndex = new Map(trackOrder.map((name, index) => [name, index]));

export const TRACKS = Object.entries(trackModules)
  .map(([path, url]) => {
    const filename = path.split('/').pop() ?? '';
    const name = filename.replace(/\.[^.]+$/, '');
    return { name, url };
  })
  .sort((a, b) => {
    const aIndex = orderIndex.get(a.name.toLowerCase());
    const bIndex = orderIndex.get(b.name.toLowerCase());

    if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
    if (aIndex !== undefined) return -1;
    if (bIndex !== undefined) return 1;
    return a.name.localeCompare(b.name);
  });
