const trainingsContent = [
  {
    title: "Тренинг по коммуникациям",
    date: "2025-08-20",
    description: "Развитие навыков эффективного общения в команде."
  },
  {
    title: "Лекция по управлению персоналом",
    date: "2025-09-05",
    description: "Обзор современных методов управления HR-процессами."
  }
];

let content = [...trainingsContent];

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
