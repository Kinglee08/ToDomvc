(function(angular) {
	
angular
	.module('todoApp.controller', [])
	.controller('TodoController', ['$scope', '$location', 'DataService', TodoController]);

	// 控制器函数
	function TodoController($scope, $location, DataService) {
		var vm = $scope;
		// 1 展示列表项
		// 1.1 处理任务的选中状态
		// 1.2 处理当前任务的样式
		vm.taskList = DataService.getData();

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

			DataService.setData(vm.newTask);			

			// 清空文本框内容
			vm.newTask = '';

			// 因为新添加的任务都是没被选中的
			vm.allChecked = false;
		};

		// 3 删除任务
		// 3.1 根据当前项的id， 从列表中删除数据
		vm.remove = function( id ) {
			DataService.remove(id);
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

			DataService.save();
		};

		// 5 切换任务选中状态
		vm.toggleItem = function() {
			vm.allChecked = DataService.allChecked();

			DataService.save();
		}

		vm.allChecked = DataService.allChecked();

		vm.checkAll = function() {
			DataService.checkAll(vm.allChecked);
		};	

		// 6 清除已完成的任务
		vm.clearAll = function() {
			DataService.clearAll();
			// thistasklist的指向改变了 需要重新获取
			vm.taskList = DataService.getData();
		};

		
		vm.isShow = function() {
			return DataService.isShow();
		}

		// 7 显示未完成任务数

		vm.getUnCompleted = function() {
			return DataService.getUnCompleted();
		}

		// 8 显示不同状态的任务
		// 8.1 任务有三种状态：全部、未完成、已完成
		// 单机不同的任务状态，会展示出当前任务状态对应的任务
		// 8.2 单击哪个任务状态，就给当前元素添加类
		// 
		// 我们通过 过滤器 来实现这个功能
		vm.selectedStatus = {isCompleted: undefined};
		vm.location = $location;
		vm.$watch('location.url()', function(newValue, oldValue) {
			switch(newValue) {
				case '/':
					vm.selectedStatus = {isCompleted: undefined};
					break;
				case '/active':
					vm.selectedStatus = {isCompleted: false};
					break;
				case '/completed':
					vm.selectedStatus = {isCompleted: true};
					break;
			}
		}, true);

	}
	// 
	// 
})(angular);