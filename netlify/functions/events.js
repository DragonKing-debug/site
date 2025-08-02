const eventsContent = [
  {
    title: "Корпоративный тимбилдинг",
    date: "2025-08-15",
    description: "Мероприятие для сплочения команды и улучшения коммуникаций."
  },
  {
    title: "Обучающий семинар по HR",
    date: "2025-09-10",
    description: "Семинар по современным HR-практикам и инструментам."
  }
];

let content = [...eventsContent];

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
