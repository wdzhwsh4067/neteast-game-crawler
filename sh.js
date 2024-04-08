"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
console.log('Hello, TypeScript!');
// 创建 rclone 命令的子进程
var rclone = (0, child_process_1.spawn)('rclone', ['config']);
// 定义变量来控制输入的值
var inputValue = 'n';
// 监听子进程的 stdout 输出
rclone.stdout.on('data', function (data) {
    // 将子进程的输出转换成字符串
    var output = data.toString();
    // 在控制台中打印输出
    console.log(output);
    // 如果输出中包含 'y/n'，则向子进程输入 'n'
    if (output.includes('y/n')) {
        rclone.stdin.write(inputValue.concat('\n'));
    }
});


// // 监听子进程的 stderr 输出
// rclone.stderr.on('data', function (data) {
//     // 将子进程的错误输出转换成字符串
//     var error = data.toString();
//     // 在控制台中打印错误输出
//     console.error(error);
// });
setTimeout(() => {
    rclone.stdin.write('n\n');
  }, 2000);

setTimeout(() => {
    rclone.stdin.write('31\n');
  }, 2000);

  setTimeout(() => {
    rclone.stdin.write('32\n');
  }, 2000);

  setTimeout(() => {
    rclone.stdin.write('31\n');
  }, 2000);
// 监听子进程的退出事件
rclone.on('exit', function (code) {
    console.log("rclone exited with code ".concat(code));
});
