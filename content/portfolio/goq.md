---
title: 'GOQ (Goku)'
summary: A simple CLI tool for consuming RabbitMQ messages and saving them to files
source: https://github.com/marianozunino/goq
description: 'Project: A lightweight CLI for RabbitMQ message consumption.'
position: 0
language: 'GoLang'
---

#### Overview
GOQ (Goku) is a command-line tool that simplifies the process of consuming RabbitMQ messages and saving them to files. It is designed to automate message extraction without altering the original queue, making it ideal for tasks like debugging and message analysis.

#### Motivation
At work, we manage multiple tenants, each with many RabbitMQ instances and a large number of queues. Occasionally, we need to dump messages from specific queues for debugging purposes. However, we can't alter or affect the state of the queues. Manually doing this is time-consuming and error-prone. GOQ was created to streamline this process—allowing us to copy the messages efficiently without affecting their state in the queue.

#### Solution
GOQ provides a simple, consistent way to extract messages from RabbitMQ queues without acknowledging or removing them. It gives us the flexibility to debug and analyze messages without disrupting live systems. By automating connection setup, message retrieval, and file output, GOQ saves time and reduces the risk of manual errors.

#### How It Works
1. **Connection**: GOQ establishes a connection to the RabbitMQ instance, supporting both AMQP and secure AMQPS protocols.
2. **Queue Binding**: It attaches to the specified queue, ensuring that messages can be consumed without being removed or acknowledged.
3. **Message Consumption**: GOQ reads the messages and processes them based on user preferences (e.g., file mode or acknowledgment options).
4. **File Output**: The consumed messages are written to a file for later analysis, without altering the original queue content or flow.
5. **Control and Safety**: The tool ensures that no messages are lost or altered during the process, making it safe for production environments.

GOQ was built to make debugging RabbitMQ queues more efficient, especially in complex, multi-tenant environments with numerous instances and queues.
