

let tasks=[];

let nextTaskId=1;

class Task{
    constructor(taskData, userId){
        this.id=nextTaskId++;
        this.title=taskData.title;
        this.description=taskData.description || '';
        this.completed=false;
        this.priority=taskData.priority || 'medium';
        this.userId=userId;
        this.createdAt=new Date();
        this.updatedAt=new Date();
        this.dueDate=taskData.dueDate ? new Date(taskData.dueDate): null;

    }


    static create(taskData, userId){
        const task=new Task(taskData, userId);
        tasks.push(task);
        return task;
    }


    static findByUserId(userId){
        return tasks.filter(task=>task.userId===userId);
    }

    static findById(userId, id){
        return tasks.find(task=>task.id===parseInt(id) && task.userId===userId);
    }



    static updatedById(id, userId, updates){
        const taskIndex=tasks.findIndex(task=>task.id===parseInt(id) && task.userId===userId);
        if(taskIndex===-1) return null;

        tasks[taskIndex]={...tasks[taskIndex], ...updates, updatedAt:new Date()};
        return tasks[taskIndex];
    }

    static deleteById(id, userId){
        const taskIndex=tasks.findIndex(task=>task.id===parseInt(id) && task.userId===userId);
        if(taskIndex===-1) return null;

        return tasks.splice(taskIndex, 1)[0];
    }
}

module.exports={Task, tasks};