(function (window) {
	'use strict';
	// 完成案例任务代码
	angular
		.module('todoApp', [])
		.controller('TodoController', ['$scope', TodoController]);

		// 控制器函数		
		function TodoController($scope) {
			var vm = $scope;
			// 1 展示列表项
			// 1.1 处理任务的选中状态
			// 1.2 处理当前任务的样式
			var taskList = [
			{id: 1, name: '抽烟', isCompleted:false},
			{id: 2, name: '喝酒', isCompleted:true},
			{id: 3, name: '烫头', isCompleted:false}
			];
			vm.taskList = taskList;

			// 2 添加任务
			// 2.1 在添加狂中输入内容，点击回车，进行添加任务
			// 2.2 清空文本框内容
			// 2.3 判断是否为空，为空不处理
			vm.newTask = '';
			vm.add = function() {
				// 只需要往taskList数组中添加一条数据，页面结构hi自动改变！
				if(vm.newTask.trim() === '') {
					return;
				}

				// 根据数组中最后一项的id，再加1 获取到当前的id
				var id, len = vm.taskList.length;
				if(len === 0) {
					id = 1;
				}else{
					id = vm.taskList[len - 1].id + 1;
				}

				// 添加任务，并且默认状态为未完成
				vm.taskList.push({id: id, name: vm.newTask, isCompleted:false});

				// 清空文本框内容
				vm.newTask = '';
			};


		}
	

})(window);
 