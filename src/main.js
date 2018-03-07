import './globalStyle/global.less'
import  { a } from './modules/a'
import  { b } from './modules/b'
let hello = 'hello world'
document.getElementById('root').innerHTML = hello
a.say()
b.say()