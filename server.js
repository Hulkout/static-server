var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
        response.statusCode = 200     
        const filePath = path === '/' ? '/index.html' : path//默认首页
        const index = filePath.lastIndexOf('.')//第几位是. .的下标
        const suffix = filePath.substring(index)//从.的下标这里开始获取你得子字符串,也就是后缀
        //通过哈希表 一一映射
         const fileTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
         }//万一它后缀不是以上三个 还有个兜底的就是html
        response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    
        let content
        try {//try的意思就是这里面的代码有可能报错
            content = fs.readFileSync(`public${filePath}`)
        } catch (error) {//如果报错 抓住这个错误
            response.statusCode = 404
            content = '文件不存在'
        }
        response.write(content)
        response.end()
   

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)