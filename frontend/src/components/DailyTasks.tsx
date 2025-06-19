interface Task {
  id: number;
  tittle: string;
  description: string;
  user_id: number;
  complete: number;
}

interface DailyTasksProps {
  dailyTasks: Task[];
  
}

export const DailyTasks = ({ dailyTasks }: DailyTasksProps) => {
  
  
  return (
    <div className="space-y-4">
      {dailyTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No daily tasks yet</p>
          <p className="text-gray-400 text-sm mt-2">Add your first task to get started!</p>
        </div>
      ) : (
        dailyTasks.map((task) => (
          <div 
            key={task.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 mb-2 break-words">
                  {task.tittle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed break-words">
                  {task.description}
                </p>
              </div>
              
              {/* Delete Button */}
              <button
                
                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                title="Delete task"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};