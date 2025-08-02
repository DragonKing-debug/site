const mentoringContent = [
  {
    title: "Программа наставничества для новых сотрудников",
    description: "Поддержка и обучение новых сотрудников для успешной адаптации и профессионального роста."
  },
  {
    title: "Профессиональное развитие",
    description: "Развитие навыков и компетенций через тренинги и практические занятия."
  }
];

let content = [...mentoringContent];

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
