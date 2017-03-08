(function (window) {
	'use strict';
	// 完成案例任务代码
	angular
		.module('todoApp', [])
		.controller('TodoController', ['$scope', TodoController]);

		// 控制器函数
		
		function TodoController($scope) {
			var vm = $scope;
			// 展示列表项
			// 1.1 处理任务的选中状态
			// 1。2处理当前任务的样式
			var taskList = [
			{id: 1, name: '抽烟', isCompleted:false},
			{id: 2, name: '喝酒', isCompleted:true},
			{id: 3, name: '烫头', isCompleted:false}
			];
			vm.taskList = taskList;
		}
	

})(window);
 