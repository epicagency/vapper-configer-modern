'use strict'

const BaseConfiger = require('@vapper/configer-vue-cli')

// ModernConfigerPlugin
class ModernConfigerPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    const ID = 'modern-configer-plugin'

    compiler.hooks.compilation.tap(ID, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        ID,
        async (data, cb) => {
          // Use <script type="module"> for modern assets
          data.body.forEach(tag => {
            if (tag.tagName === 'script' && tag.attributes) {
              tag.attributes.type = 'module'
            }
          })

          // Use <link rel="modulepreload"> instead of <link rel="preload">
          // for modern assets
          data.head.forEach(tag => {
            if (
              tag.tagName === 'link' &&
              tag.attributes.rel === 'preload' &&
              tag.attributes.as === 'script'
            ) {
              tag.attributes.rel = 'modulepreload'
            }
          })

          cb()
        }
      )

      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(ID, data => {
        data.html = data.html.replace(/\snomodule="">/g, ' nomodule>')
      })
    })
  }
}

module.exports = class ModernConfiger extends BaseConfiger {
  clientChainFn(config) {
    super.clientChainFn(config)

    if (process.env.BROWSERSLIST_ENV === 'modern') {
      config.plugin('modern-configer').use(ModernConfigerPlugin)
    }
  }
}
