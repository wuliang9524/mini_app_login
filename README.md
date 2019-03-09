#	基本要求

>	1.	理解ES6 Promise对象的使用，小程序前端使用频繁

>	2.	FastAdmin后台框架的基本安装环境(基本PHP环境即可，官方文档中可选环境要求可忽略)，可以到[FastAdmin官方文档][fastadmin_doc]查阅，项目后台使用了FastAdmin框架及框架中的开源第三方登录插件二开达到快速实现的效果。


#	安装使用
	
*	## 后台搭建
	1.	Clone完整项目到本地。
	2.	新建一个站点域名，网站路径指向项目的 `backend/public/`文件夹，更改hosts文件。
	3.	在浏览器中打开上一步创建的站点，进入安装向导。
	4.	安装完成后登录后台管理，在左侧导航栏中点击 **插件管理**，然后点击上方的 **离线安装**，然后选择项目中的 `third-1.0.5.zip` 压缩包，完成离线安装插件。
	5.	最后再到 **插件管理** 中的 **本地插件**，找到刚安装的 **第三方登录** 插件，点击右方操作 **配置** 按钮，在弹出框中 **微信小程序** 一栏输入自己的小程序app_id及app_secret，注意这里的app_id要与小程序前端中的appid一致。

*	## 小程序前端
	1.	在微信开发工具中导入项目，目录指向项目的 `frontend` 文件夹，并更改Appid为自己的小程序Appid。
	2.	导入项目后，在app.js中修改 `gData.api.request` 域名为自己的后台站点域名。
	3.	全部安装完成，体验即可。
	
#	问题反馈

在使用中遇到任何问题，可以通过以下方式联系我：

微信： 

Q Q： 

Github: [https://github.com/wuliang9524/mini_app_login][github]

Gitee: [https://gitee.com/wuliang924/demo_miniapp_login][gitee]

#	版权声明

本项目包含的第三方源码和二进制文件之版权信息另行标注。

未经本人允许，项目不得用于商业用途，否则造成的一切后果概不负责。

[fastadmin_doc]: <https://doc.fastadmin.net/docs/install.html> "FA官方文档"

[gitee]: <https://gitee.com/wuliang924/demo_miniapp_login> "Gitee"

[github]: <https://github.com/wuliang9524/mini_app_login> "Github"