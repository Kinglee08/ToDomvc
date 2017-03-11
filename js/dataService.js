(function(angular) {
	angular
		.module('todoApp.DataSrv', [])
		.service('DataService', ['$window', function($window) {
			
			// 1 展示列表项
			// 将数据存储到localStorage中，
			// 数据也是从localStorage中获取的
			var localStorage = $window.localStorage;

			// 获取数据
			var dataStr = localStorage.getItem('todo');
			var taskList = JSON.parse(dataStr) || [];
			this.taskList = taskList;

			// 获取数据的方法
			this.getData = function() {
				return this.taskList;
			};

			// 2 添加数据
			this.setData = function(name) {
				var id, len = this.taskList.length;
				if(len === 0) {
					id = 1;
				}else{
					id = this.taskList[len - 1].id + 1;
				}

				// 添加任务，并且默认状态为未完成
				this.taskList.push({id: id, name: name, isCompleted:false});
				// 存储数据
				this.save();
			};

			// 存储数据
			this.save = function() {
				localStorage.setItem('todo', JSON.stringify(this.taskList));
			};

			// 3 删除数据
			this.remove = function(id) {
				for(var i = 0; i < this.taskList.length; i++) {
					if(this.taskList[i].id === id) {
						// splice(i, 1) 就是从数组中删除一条数据, 然后改变的也是当前数组!!!
						this.taskList.splice(i, 1);
					}
				}
				this.save();
			};

			// 4 修改任务

			
			// 5 切换任务选中状态
			this.checkAll = function(allChecked) {
				this.taskList.forEach(function(task) {
					task.isCompleted = allChecked;
				});

				this.save();
			};

			// 控制全选按钮的状态
			this.allChecked = function(){
				var checked = true;
				(this.taskList.length === 0) && (checked = false);
				this.taskList.forEach(function(task) {
					if(!task.isCompleted) {
						checked = false;
					}
				});

				return checked;
			};

			// 6 清除已经完成的任务
			this.clearAll = function() {
				var temp = [];
				for(var i = 0; i < this.taskList.length; i++) {
					if(!this.taskList[i].isCompleted) {
						temp.push(this.taskList[i]);
					}
				}

				this.taskList = temp;
				this.save();
			};

			this.isShow = function() {
				var temp = false;
				for(var i = 0; i < this.taskList.length; i++) {
					if(this.taskList[i].isCompleted) {
						temp = true;
						break;
					}
				}
				return temp;
			};	

			// 7 显示为完成任务数
			this.getUnCompleted = function() {
				var count = 0;

				this.taskList.forEach(function(task) {
					if(!task.isCompleted) {
						count++;
					}
				});

				return count;
			};

		}]); 
})(angular);