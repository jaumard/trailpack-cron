/**
 * Annotations Configuration
 * (app.config.annotations)
 *
 * Configure route, policy annotations, add custom annotation
 *
 * @see {@link https://github.com/jaumard/trailpack-annotations}
 */
module.exports = {
  pathToScan: './api',//Where to search controllers
  customAnnotations: require('../annotations')//Custom annotations here
}
