module.exports = {
    "parser":"babel-eslint", //解析器
    // "extends" :'airbnb-base', //继承别人写的规则
    "env": {    //生效环境，该环境的全局变量，不会提示
        "browser": true,
        "node": true,
        "es6": true,
		"commonjs": true
    }
}