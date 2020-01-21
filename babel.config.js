module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: 'last 2 versions, ie 11',
        },
      ],
    ],
  };
};
