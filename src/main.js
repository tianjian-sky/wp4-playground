import './globalStyle/global.less'
import './globalStyle/a.less'
import  { a } from './modules/a'
import  { b } from './modules/b'
import $ from 'npm-zepto'

let hello = 'hello world'
document.getElementById('root').innerHTML = hello
a.say()
b.say()
console.log('aa')