module.exports = {
  files: 'src/**',
  targets: ['vue', 'solid', 'angular', 'qwik'],
  options: {
    vue: { api: 'composition' },
  },
  commonOptions: {
    typescript: true,
  },
  dest: 'output',
};
