let taskIndex = 0;
let completedCount = 0;
let uncompletedCount = 0;
let MonthArr=[1,2,3,4,5,6,7,8,9,10,11,12]

window.onload = () => {



    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);
        if (key.startsWith("task_") && !key.startsWith("taskUn_")) {
            const task = localStorage.getItem(key);
            const index = key.split("_")[1];
            const status = localStorage.getItem(`taskUn_${index}`);
            const dateR = localStorage.getItem(`taskDate${index}`);

            displayTask(task, index, status, dateR);
            taskIndex = Math.max(taskIndex, Number(index) + 1);

            if (status === "done") {
                completedCount++;
            } else {
                uncompletedCount++;
            }

        }
    }



    updateCounters();
};
document.querySelector("#deletAll").onclick = () => {
    
    completedCount = 0;
     uncompletedCount = 0;
    document.querySelector(".tasks").innerHTML=" ";
    localStorage.clear();
    updateCounters();

}

document.querySelector("#taskForm").onsubmit = function (e) {
    e.preventDefault();
    let dateT = new Date()
    for (let i = 0; i < 12; i++) {
        if (new Date().getMonth() === i) {
            dateT.setMonth(MonthArr[i])

        }
        dateT = `${dateT.getDate()}\\${dateT.getMonth()}\\${dateT.getFullYear()}${dateT.getHours()}:${dateT.getMinutes()}`;
    
    const value = document.querySelector("#text").value.trim();
    if (value !== "") {
        localStorage.setItem(`task_${taskIndex}`, value);
        localStorage.setItem(`taskUn_${taskIndex}`, "undone");
        localStorage.setItem(`taskDate${taskIndex}`, dateT);
        
            
        }
        displayTask(value, taskIndex, "undone", dateT );
        taskIndex++;
        uncompletedCount++;
        updateCounters();
        document.querySelector("#text").value = "";
    }
};

function updateCounters() {
    document.querySelector("#counDone").textContent = completedCount;
    document.querySelector("#counUDone").textContent = uncompletedCount;
}

function displayTask(text, index, status = "undone", dateT) {
    
    const taskDiv = document.createElement("div");
    const ButDiv = document.createElement("div");
    const dateP = document.createElement("p");
    dateP.textContent = dateT;
    
    ButDiv.className = "taskButton"

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = text;
    taskInput.readOnly = true;

    // زر تعديل
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.backgroundColor = "#FFA000";
    editBtn.onclick = () => {
        if (editBtn.textContent === "Edit") {
            editBtn.textContent = "Save";
            editBtn.style.backgroundColor = "#2196F3";
            taskInput.readOnly = false;
            taskInput.focus();
        } else {
            editBtn.textContent = "Edit";
            editBtn.style.backgroundColor = "#FFA000";
            taskInput.readOnly = true;
            localStorage.setItem(`task_${index}`, taskInput.value);
        }
    };

    // زر تم/غير مكتملة
    const doneBtn = document.createElement("button");
    doneBtn.textContent = status === "done" ? "done" : "undone";
    doneBtn.style.backgroundColor = status === "done" ? "blue" : "red";
    doneBtn.style.color = "white";

    doneBtn.onclick = () => {
        const currentStatus = localStorage.getItem(`taskUn_${index}`);
        if (currentStatus === "undone") {
            localStorage.setItem(`taskUn_${index}`, "done");
            doneBtn.textContent = "done";
            doneBtn.style.backgroundColor = "blue";
            completedCount++;
            uncompletedCount--;

        }
        
        updateCounters();
    };
    

    // زر حذف
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "#E53935";
    deleteBtn.style.color = "white";

    deleteBtn.onclick = () => {
        const currentStatus = localStorage.getItem(`taskUn_${index}`);
        if (currentStatus === "done") {
            completedCount--;
        } else {
            uncompletedCount--;
        }
        localStorage.removeItem(`task_${index}`);
        localStorage.removeItem(`taskUn_${index}`);
        localStorage.removeItem(`taskDate${index}`);
        taskDiv.remove();
        updateCounters();
    };

    // تجميع العناصر
    taskDiv.appendChild(taskInput);
    taskDiv.appendChild(dateP);
    ButDiv.appendChild(doneBtn);
    ButDiv.appendChild(editBtn);
    ButDiv.appendChild(deleteBtn);
    taskDiv.append(ButDiv);
    document.querySelector(".tasks").appendChild(taskDiv);
}
document.querySelector("#clickDone").onclick = () => {

    document.querySelector("#clickUnDone").classList.remove("active");
    document.querySelector("#all").classList.remove("active");
    document.querySelector("#clickDone").classList.add("active");
    // 1. تنظيف القائمة الحالية
    document.querySelector(".tasks").innerHTML = "";

    // 2. استعراض جميع مفاتيح localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // 3. فقط مفاتيح المهام الفعلية
        if (key.startsWith("task_") && !key.startsWith("taskUn_")) {
            const task = localStorage.getItem(key);
            const index = key.split("_")[1];
            const status = localStorage.getItem(`taskUn_${index}`);
            const dateR = localStorage.getItem(`taskDate${index}`);

            // 4. عرض المهام المكتملة فقط
            if (status === "done") {
                displayTask(task, index, status, dateR);
            }
        }
    }
};
document.querySelector("#clickUnDone").onclick = () => {
    document.querySelector("#clickUnDone").classList.add("active");
    document.querySelector("#all").classList.remove("active");
    document.querySelector("#clickDone").classList.remove("active");
    // 1. تنظيف القائمة الحالية
    document.querySelector(".tasks").innerHTML = "";

    // 2. استعراض جميع مفاتيح localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // 3. فقط مفاتيح المهام الفعلية
        if (key.startsWith("task_") && !key.startsWith("taskUn_")) {
            const task = localStorage.getItem(key);
            const index = key.split("_")[1];
            const status = localStorage.getItem(`taskUn_${index}`);
            const dateR = localStorage.getItem(`taskDate${index}`);

            // 4. عرض المهام المكتملة فقط
            if (status === "undone") {
                displayTask(task, index, status,dateR);

            }

        }
    }
};
document.querySelector("#all").onclick = () => {
    document.querySelector(".tasks").innerHTML = "";

    document.querySelector("#clickUnDone").classList.remove("active");
    document.querySelector("#all").classList.add("active");
    document.querySelector("#clickDone").classList.remove("active");
    // 1. تنظيف القائمة الحالية
    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);
        if (key.startsWith("task_") && !key.startsWith("taskUn_")) {
            const task = localStorage.getItem(key);
            const index = key.split("_")[1];
            const status = localStorage.getItem(`taskUn_${index}`);
            const dateR = localStorage.getItem(`taskDate${index}`);

            displayTask(task, index, status,dateR);
            taskIndex = Math.max(taskIndex, Number(index) + 1);



        }
    }
}

