import { spawn } from 'child_process';
console.log('Hello, TypeScript!');
// 创建 rclone 命令的子进程
const rclone = spawn('rclone', ['config']);

// 定义变量来控制输入的值
let inputValue = '1';

// 监听子进程的 stdout 输出

rclone.stdout.on('data', (data: Buffer) => {
  // 将子进程的输出转换成字符串
  const output = data.toString();

  // 在控制台中打印输出
  console.log(output);

  // 如果子进程提示输入数字，向其发送 inputValue
  if (output.includes('Please enter a number:')) {
    rclone.stdin.write(`${inputValue}\n`);
  }
});

// 监听子进程的 stderr 输出
rclone.stderr.on('data', (data: Buffer) => {
  // 将子进程的错误输出转换成字符串
  const error = data.toString();

  // 在控制台中打印错误输出
  console.error(error);
});

// 监听子进程的退出事件
rclone.on('exit', (code: number) => {
  console.log(`rclone exited with code ${code}`);
});