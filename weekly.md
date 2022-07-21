## [Vite 3.0 发布](https://javascriptweekly.com/link/126370/web)

Vite，一个与Vue.js同出一源的前端开发和构建工具，被Nuxt、SvelteKit、Astro，甚至PHP的Laravel等不同项目所使用。  
- ### 开发改进
  - #### Vite CLI  默认开发服务器端口5173（vite2是3000）
  - #### 改进WebSocket连接策略 
     Vite 2 的痛点之一是在代理后面运行时配置服务器。Vite 3 更改了默认的连接方案，因此它在大多数情况下都是开箱即用的。[vite配置demo](https://github.com/sapphi-red/vite-setup-catalogue/blob/main/README.md)
  - #### 冷启动改进
     Vite 现在可以避免在冷启动期间，当插件在抓取初始静态导入的模块时注入导入时完全重新加载  
     ![vite](https://vitejs.dev/assets/vite-3-cold-start.bd9ac556.svg)
  - #### import.meta.glob改进  
     Vite支持通过import.meta.glob函数从文件系统导入多个模块，默认是动态导入的方式懒加载，在构建过程中被分割成不同的块（如果想直接导入所有模块，也可通过配置eager:true不使用动态导入） ，下面是改动点：  
     参数可以传数组了
     ```js
       import.meta.glob(['./dir/*.js', './another/*.js'])
     ```
     以 ! 为前缀以忽略某些特定文件
     ```js
       import.meta.glob(['./dir/*.js', '!**/bar.js'])
     ```
     命名导入 - 可以通过导入选项只导入部分模块。
     ```js
       const modules = import.meta.glob('./dir/*.js', { import: 'setup' })
     ```
     ```js
       // code produced by vite
       const modules = {
         './dir/foo.js': () => import('./dir/foo.js').then((m) => m.setup),
         './dir/bar.js': () => import('./dir/bar.js').then((m) => m.setup)
       }
     ```
     命名导入+eager，有助于tree-shaking
     ```js
       const modules = import.meta.glob('./dir/*.js', { import: 'setup', eager: true })
     ```
     ```js
       // code produced by vite:
       import { setup as __glob__0_0 } from './dir/foo.js'
       import { setup as __glob__0_1 } from './dir/bar.js'
       const modules = {
         './dir/foo.js': __glob__0_0,
         './dir/bar.js': __glob__0_1
       }
     ```
     导入时加参数
     ```js
       const modules = import.meta.glob('./dir/*.js', {
         query: { foo: 'bar', bar: true }
       })
     ```
     ```js
       // code produced by vite:
       const modules = {
         './dir/foo.js': () =>
           import('./dir/foo.js?foo=bar&bar=true').then((m) => m.setup),
         './dir/bar.js': () =>
           import('./dir/bar.js?foo=bar&bar=true').then((m) => m.setup)
       }
     ```
- ### 构建改进
  - #### ESM SSR 默认构建
     生态系统中的大多数SSR框架已经在使用ESM构建了。因此，Vite 3将ESM作为SSR构建的默认格式。默认外部化依赖项，不需要配置ssr.external。
  - #### 改进的 Relative Base 支持
     Vite 3 现在正确支持 relative base（使用 base: ''），允许将构建的资产部署到不同的 bases 而无需重新构建。这在构建时不知道 base 的情况下非常有用，例如在部署到 IPFS 等内容可寻址网络时。
- ### 减少捆绑包大小  
   Vite 捆绑了它的大部分依赖项，并尽可能地尝试使用现代轻量级替代方案。Vite 3 的发布大小比 V2 小了 30%。  
     ![vite](https://oscimg.oschina.net/oscnet/up-1531fc6135ec675f458e7a80b28ae292e9a.png)
-  ### 错误修复
     在过去的三个月里，Vite 的 open issues 从 770 个减少到了 400 个。  

     [官方-vite3改进文档](https://vitejs.dev/blog/announcing-vite3.html)   
     [从vite2迁移](https://vitejs.dev/guide/migration.html)  
     [github vite3 main changes](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#300-2022-07-13)  

## [CKEditor 5来了，让协作写作变得更容易](https://javascriptweekly.com/link/126332/web)
一个可定制的富文本编辑器，让你在几个小时内就能在你的应用程序中建立协作。随时可以使用的功能，如评论、跟踪修改、实时协作、版本历史等。  
-  CKEditor 5的核心是为了处理树状结构的自定义数据模型。这样就可以在复杂的结构中实现快速可靠的实时协作，如表格或嵌套的小部件。我们提供所有必要的基础设施，包括SaaS和可扩展的内部解决方案，以便在你的应用程序中实现实时协作编辑。  
-  版本历史是CKEditor 5全新的功能，允许你创建、命名、查看、比较和恢复文档版本。在版本预览模式下，可以看到对内容所做的所有修改，以及按时间顺序排列的版本列表。  

与js框架集成比较友好，支持目前三个主流框架，官方提供了[集成文档](https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/overview.html)



## [Rety: 没有压力的现场编码](https://javascriptweekly.com/link/126381/web)

 上周我们提到了Lea Verou的 [CSS变量讲座](https://javascriptweekly.com/link/126382/web)，这个讲座有一些 "现场编码" 的部分，这些部分是用Rety提前安排好的。  

 

 

 ## [Node-RED 3.0发布](https://javascriptweekly.com/link/126333/web)

  [Node-RED](https://javascriptweekly.com/link/126334/web)是一个流行的基于Node.js的低/无代码编程环境，大量用于物联网领域。v3.0需要Node 14以上，包括大量的UI/UX增强。如果视觉上将逻辑组件连接在一起的想法对你有吸引力，那么非常值得一试。  
Rety是一个库，它允许你记录你对一个或多个文本（通常是代码）的编辑，并在以后重放它们，以重新创建相同的输入流程。  
> Node-RED最初是IBM在2013年末开发的一个开源项目，以满足他们快速连接硬件和设备到Web服务和其他软件的需求。是构建物联网应用程序的一个强大工具，使编程可视化，简化代码块的“连接”以执行任务  
![node-red](https://pic2.zhimg.com/80/v2-d8b5b4530f179226ceb632200eff343d_1440w.jpg)

<br/>

## 📒 文章和教程

### [语句与表达式](https://javascriptweekly.com/link/126345/web) 

如果让你在现场描述JavaScript中语句与表达式的区别，你会有一个好的答案吗？如果你不完全确定，这是一个很好的复习资料，说明其中的内容。 
> 表达式是一段产生数值的JavaScript代码。 一个JavaScript程序是一连串的语句。每条语句都是计算机做某事的指令。语句是支撑我们程序的刚性结构，而表达式则填补了细节。

语句通常有表达式的 "槽"。我们可以把任何我们喜欢的表达式放到这些槽里。


### [测试Bun的速度和与Node.js的兼容性](https://javascriptweekly.com/link/126377/web)

David决定让Bun经历它的考验，看看它在真实世界的应用中与Node.js的表现如何。不出所料，对于一个具有真实世界压力的应用程序（文件系统、网络等）来说，性能上的差异很小，但他对它的无缝工作印象深刻。  

### [Don’t Let Your Issue Tracker Be a Four-Letter Word. Use Shortcut](https://javascriptweekly.com/link/126348/web)  
流程管理平台，可提供最小级别的任务清单，提供的api广泛，便于集成其他佛工具（github\slack...）

### [在React中应用SOLID原则](https://javascriptweekly.com/link/126346/web)  
- Single responsibility principle (SRP)  单一职责原则  
   demo：从远程获取列表信息，并进行筛选后，渲染到页面的demo，封的很好，比较实用。
```js
const ActiveUsersList = () => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const loadUsers = async () => {  
      const response = await fetch('/some-api')
      const data = await response.json()
      setUsers(data)
    }
    loadUsers()
  }, [])
  
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return (
    <ul>
      {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => 
        <li key={user.id}>
          <img src={user.avatarUrl} />
          <p>{user.fullName}</p>
          <small>{user.role}</small>
        </li>
      )}
    </ul>    
  )
}
```
```js
const useActiveUsers = () => {
  const { users } = useUsers()
  const activeUsers = useMemo(() => {
    return getOnlyActive(users)
  }, [users])
  return { activeUsers }
}
const ActiveUsersList = () => {
  const { activeUsers } = useActiveUsers()
  return (
    <ul>
      {activeUsers.map(user => 
        <UserItem key={user.id} user={user} />
      )}
    </ul>    
  )
}
```
- Open-closed principle (OCP) 开闭原则: 软件实体应该是开放的，可以进行扩展，但对修改是封闭的
demo: 一个可复用的Header组件，但是根据所引用的地方又稍有区别  
```jsx
const Header = () => {
  const { pathname } = useRouter()
  
  return (
    <header>
      <Logo />
      <Actions>
        {pathname === '/dashboard' && <Link to="/events/new">Create event</Link>}
        {pathname === '/' && <Link to="/dashboard">Go to dashboard</Link>}
      </Actions>
    </header>
  )
}
const HomePage = () => (
  <>
    <Header />
    <OtherHomeStuff />
  </>
)
const DashboardPage = () => (
  <>
    <Header />
    <OtherDashboardStuff />
  </>
)
```
```jsx
const Header = ({ children }) => (
  <header>
    <Logo />
    <Actions>
      {children}
    </Actions>
  </header>
)
const HomePage = () => (
  <>
    <Header>
      <Link to="/dashboard">Go to dashboard</Link>
    </Header>
    <OtherHomeStuff />
  </>
)
const DashboardPage = () => (
  <>
    <Header>
      <Link to="/events/new">Create event</Link>
    </Header>
    <OtherDashboardStuff />
  </>
)
```
- Liskov substitution principle (LSP) 里氏替换原则: 子类应该能替换为它的基类, 没有案例，在react中不十分适用
- Interface segregation principle (ISP) 接口隔离原则：组件不应该依赖他们不使用的props  
demo: 渲染视频列表  
```jsx
type Video = {
  title: string
  duration: number
  coverUrl: string
}
type Props = {
  items: Array<Video>
}
const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map(item => 
        <Thumbnail 
          key={item.title} 
          video={item} 
        />
      )}
    </ul>
  )
}
```  
Thumbnail组件实现：
```ts
type Props = {
  video: Video
}
const Thumbnail = ({ video }: Props) => {
  return <img src={video.coverUrl} />
}
```  
假设随着业务发展还可能会传入另一种类型给Thumbnail组件：
```ts
type LiveStream = {
  name: string
  previewUrl: string
}
```
```jsx
type Props = {
  items: Array<Video | LiveStream>
}
const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map(item => {
        if ('coverUrl' in item) {
          // it's a video
          return <Thumbnail video={item} />
        } else {
          // it's a live stream, but what can we do with it?
        }
      })}
    </ul>
  )
}
```  
对 Thumbnail 重构： 
```ts
type Props = {
  coverUrl: string
}
const Thumbnail = ({ coverUrl }: Props) => {
  return <img src={coverUrl} />
}
```
```jsx
type Props = {
  items: Array<Video | LiveStream>
}
const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map(item => {
        if ('coverUrl' in item) {
          // it's a video
          return <Thumbnail coverUrl={item.coverUrl} />
        } else {
          // it's a live stream
          return <Thumbnail coverUrl={item.previewUrl} />
        }
      })}
    </ul>
  )
}
```
- Dependency inversion principle (DIP) 依赖倒置原则  
demo: 表单提交：  
```jsx
import api from '~/common/api'
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await api.login(email, password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  )
}
```  
如果LoginForm的handleSubmit有改动，那么引用LoginForm组件的组件都会受到影响，改动如下：
```js
type Props = {
  onSubmit: (email: string, password: string) => Promise<void>
}
const LoginForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await onSubmit(email, password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  )
}
```
```js
import api from '~/common/api'
const ConnectedLoginForm = () => {
  const handleSubmit = async (email, password) => {
    await api.login(email, password)
  }
  return (
    <LoginForm onSubmit={handleSubmit} />
  )
}
```  
ConnectedLoginForm组件作为api和LoginForm之间的粘合剂，我们可以对它进行迭代、测试，不用担心会影响其他组件


### [Vue hooks函数封装案例](https://javascriptweekly.com/link/126349/web)

基于composition api的封装教学，封装一个可复用的语音识别组件（基于Web Speech API => 使开发者能够在Web浏览器中实现语音识别和语音合成功能，使Web应用有能力将语音数据转换成可读的文本格式）

### [JS中的函数式编程介绍](https://javascriptweekly.com/link/126350/web)  
youtobe没打开...

### [在Polywork上与其他JavaScript工程师一起建立你的工作组合](https://javascriptweekly.com/link/126351/web)  
Polywork是一个社交网络，在这里你可以分享你的工作和你是谁的独特交集。与你的社区会面、讨论并发现机会。

<br/>

## 🛠代码和工具

### [添加到日历按钮。添加一个快速方法让用户 "添加到日历"。](https://javascriptweekly.com/link/126379/web)
一个npm包, 通过js配置一些属性，创建一个按钮，点击后可添加特定的事件到日历中。生成.ics文件，修改日历app。

### [Luxon 3.0: 用于处理日期和时间的库](https://javascriptweekly.com/link/126356/web)  
也是moment团队开发的, 最明显的区别是不可变性：
```js
var m1 = moment();
var m2 = m1.add(1, 'hours');
m1.valueOf() === m2.valueOf(); //=> true
```
```js
var d1 = DateTime.local();
var d2 = d1.plus({ hours: 1 });
d1.valueOf() === d2.valueOf(); //=> false
```
不用担心旧的数据被意外修改了

### [在不到一周的时间内将电子签名整合到您的应用程序中](https://javascriptweekly.com/link/126357/web)
利用HelloSign的电子签名功能，在任何地方实现文件签署。

### [NestJS v9发布](https://javascriptweekly.com/link/126358/web)
Nest是一个基于TypeScript的服务器端框架，当你需要一个比直接Express更充实和完整的平台来工作（或获得支持）时，比如说，V9引入了一个方便的REPL，一个可配置的模块生成器，耐用的提供者，以及更多。
