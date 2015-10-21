#IMM *@0.3.0*

IMM是一个由Node.js驱动的，为Web，APP提供即时通讯的服务。	
由 **[IMM-Server](#imm-server)** 和 **[IMM-Client](#imm-client)** 组成

##IMM-Server
即时通讯服务器，由Node.js驱动，采用SockJS框架。	
依赖seajs@2.2.1+	
服务器访问地址: **<http://115.28.228.10:9999/>**
url格式: **ip:port/method?param1=value1&param2=value2**	

###API

> interface: **broadcast**/广播消息  
> method: **POST/GET**	
> param:  
>
> + *channel* : 广播消息的频道
> + *type* : 广播消息类型
> + *msg* : 广播消息内容
>
> return:JSON
>
> + *flag* : true/false
> + *type* : 'system'	

***

> interface: **onlineCount**/取得在线人数 		
> method: **POST/GET**		
> param:	
>
> + *channel* : 频道
>
> return:JSON
>
> + *flag* : true/false
> + *type* : 'system'
> + *count* : int/在线人数

##IMM-Client
Web客户端JS Library,采用CMD规范，以SockJS-client为内核。	
依赖spm@2.27+	

###API