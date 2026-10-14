# Changelog

## [Unreleased]

### Changed

- Forked from `@mariozechner/mini-lit` 0.2.1, upstream tag `v0.2.1` at commit `dee21bf1175de0cb16a946ba8fb62c1e590fbd3c`.
- Changed the package identity to `@jecruz/mini-lit` and raised the KaTeX dependency range from `^0.16.22` to `^0.18.2` to include the upstream security fix GHSA-238p-pmpm-9mq7. No component source behavior was changed.
- Current lock resolution is KaTeX 0.18.10, whose CLI dependency Commander 15 declares Node >=22.12; Merc uses the renderer rather than its CLI. A packed-consumer install and KaTeX rendering check passed on Node 20 without `engine-strict`; consumers enabling `engine-strict` may refuse installation. See Merc #4094 for the check evidence.
- Excluded compiled test files from the npm package while retaining them in the source build and test suite.
