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

			// 3 删除任务
			// 3.1 根据当前项的id， 从列表中删除数据
			vm.remove = function( id ) {
				// console.log(id)
				for(var i = 0; i < vm.taskList.length; i++) {
					if(vm.taskList[i].id === id) {
						// splice(i, 1) 就是从数组中删除一条数据, 然后改变的也是当前数组!!!
						vm.taskList.splice(i, 1);
					}
				}
			}

			// 4 修改任务
			// 4.1 给每一项绑定双击事件 ng-dblclick
			// 4.2 双击后,会给当前元素添加一个: editing
			// 4.3 展示出文本框以后, 要讲当前项的名称, 展示出来
			vm.editId = 0;
			vm.edit = function( id ) {
				// 双击元素, 就让 editId 变为 当前 id
				vm.editId = id;
			};
			// 敲回车保存内容
			vm.update = function() {
				vm.editId = 0;
			};

			// 5 切换任务选中状态
			// 只要allChecked属性的值变化了，就修改任务列表中所有的数据
			// 其他方式：监视allChecked的变化
			vm.allChecked = false;
			vm.checkAll = function() {
				// 修改 taskList 中所有项的isCompleted属性的值
				// 改为与allChecked的值相同！！！
				vm.taskList.forEach(function(task) {
					task.isCompleted = vm.allChecked;
				});
			};	

			// 6 清除已完成的任务
			// 6.1 clear Completed
			// 按钮的展示和隐藏由：列表中是否具有已完成的任务来确定
			// 6.2 点击 清除按钮
			vm.clearAll = function() {
				var temp = [];
				for(var i = 0; i < vm.taskList.length; i++) {
					if(!vm.taskList[i].isCompleted) {
						temp.push(vm.taskList[i]);
					}
				}

				vm.taskList = temp;
			};

			vm.isShow = false;
			vm.$watch('taskList', function(newValue, oldValue) {
				var temp = false;

				for(var i = 0; i < vm.taskList.length; i++) {
					if(vm.taskList[i].isCompleted) {
						temp = true;
						break;
					}
				}

				vm.isShow = temp;
			}, true);

		}
})(window);
 