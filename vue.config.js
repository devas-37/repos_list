module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'ru',
            localeDir: 'src',
            enableLegacy: true,
            runtimeOnly: false,
            compositionOnly: true,
            fullInstall: true,
        },
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/finder/'
        : '/',
};
