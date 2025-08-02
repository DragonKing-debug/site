const faqContent = [
  {
    question: "Как добавить нового сотрудника?",
    answer: "Для добавления нового сотрудника обратитесь к вашему HR-менеджеру."
  },
  {
    question: "Как изменить график работы?",
    answer: "Изменения графика работы согласовываются с руководителем отдела."
  }
];

// Временное хранение в памяти (для демонстрации)
let content = [...faqContent];

exports.handler = async function(event, context) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json"
      }
    };
  } else if (event.httpMethod === "POST") {
    // Простая аутентификация через заголовок
    const auth = event.headers["authorization"];
    if (auth !== "Bearer secret-token") {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }
    try {
      const data = JSON.parse(event.body);
      if (Array.isArray(data)) {
        content = data;
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Content updated" }),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Invalid data format" }),
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid JSON" }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};
