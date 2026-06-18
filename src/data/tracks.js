const trackModules = import.meta.glob('../../music/*.{mp3,wav,ogg,m4a,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const TRACKS = Object.entries(trackModules)
  .map(([path, url]) => {
    const filename = path.split('/').pop() ?? '';
    const name = filename.replace(/\.[^.]+$/, '');
    return { name, url };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
