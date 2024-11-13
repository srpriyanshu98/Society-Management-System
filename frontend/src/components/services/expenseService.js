import axiosInstance from "../../test/axiosInstance";

export const addExpense = async (expenseData) => {
    try {
        const formData = new FormData();
        formData.append("title", expenseData.title);
        formData.append("description", expenseData.description);
        formData.append("date", expenseData.date); // Date is already formatted as "YYYY-MM-DD"
        formData.append("amount", expenseData.amount);
        formData.append("bill", expenseData.billFile);

        const response = await axiosInstance.post("/expense", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const updateExpense = async (id, expenseData) => {
    try {
        const formData = new FormData();
        formData.append("title", expenseData.title);
        formData.append("description", expenseData.description);
        formData.append("date", expenseData.date);
        formData.append("amount", expenseData.amount);
        if (expenseData.billFile) {
            formData.append("bill", expenseData.billFile);
        }

        const response = await axiosInstance.put(`/expense/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteExpense = async (id) => {
    try {
        const response = await axiosInstance.delete(`/expense/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getAllExpenses = async () => {
    try {
        const response = await axiosInstance.get("/expense");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getExpenseById = async (id) => {
    try {
        const response = await axiosInstance.get(`/expense/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
