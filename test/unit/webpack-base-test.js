const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js');

    it('entry', () => {
        assert.equal(baseConfig.entry.index, '/Users/chendelong/Documents/vue/webpack4/builder-webpack/test/smoke/template/src/index/index.js');
        assert.equal(baseConfig.entry.seach, '/Users/chendelong/Documents/vue/webpack4/builder-webpack/test/smoke/template/src/seach/index.js');
    });
});