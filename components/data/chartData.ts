import { MessageData } from "@/app/communication/viewChart";

export const mockChatRooms = [
    {
      id: "1",
      name: "Alice Johnson",
      imageUri: "https://example.com/alice.jpg",
      lastMessage: {
        id: "m1",
        content: "Reminder: Parent-teacher meeting on Thursday.",
        createdAt: "2024-09-02T14:00:00Z",
      },
      newMessages: 2,
    },
    {
      id: "2",
      name: "Bob Smith",
      imageUri: "https://example.com/bob.jpg",
      lastMessage: {
        id: "m2",
        content: "Field trip permission forms due tomorrow.",
        createdAt: "2024-09-02T12:30:00Z",
      },
      newMessages: 5,
    },
    {
      id: "3",
      name: "Charlie Davis",
      imageUri: "https://example.com/charlie.jpg",
      lastMessage: {
        id: "m3",
        content: "Homework assignments are now available online.",
        createdAt: "2024-09-02T10:45:00Z",
      },
      newMessages: 1,
    },
    {
      id: "4",
      name: "Diana Clark",
      imageUri: "https://example.com/diana.jpg",
      lastMessage: {
        id: "m4",
        content: "School will be closed on Monday due to a public holiday.",
        createdAt: "2024-09-01T16:00:00Z",
      },
      newMessages: 3,
    },
    {
      id: "5",
      name: "Ethan Lewis",
      imageUri: "https://example.com/ethan.jpg",
      lastMessage: {
        id: "m5",
        content: "Please sign up for the upcoming parent-volunteer program.",
        createdAt: "2024-08-31T07:30:00Z",
      },
      newMessages: 4,
    },
    {
      id: "6",
      name: "Fiona Martinez",
      imageUri: "https://example.com/fiona.jpg",
      lastMessage: {
        id: "m6",
        content: "Mid-term exams start next week.",
        createdAt: "2024-09-01T21:15:00Z",
      },
      newMessages: 8,
    },
    {
      id: "7",
      name: "George Wilson",
      imageUri: "https://example.com/george.jpg",
      lastMessage: {
        id: "m7",
        content: "Please review the new school policies.",
        createdAt: "2024-09-02T11:45:00Z",
      },
      newMessages: 6,
    },
    {
      id: "8",
      name: "Hannah Robinson",
      imageUri: "https://example.com/hannah.jpg",
      lastMessage: {
        id: "m8",
        content: "Science fair projects are due this Friday.",
        createdAt: "2024-09-01T18:30:00Z",
      },
      newMessages: 2,
    },
    {
      id: "9",
      name: "Ian Walker",
      imageUri: "https://example.com/ian.jpg",
      lastMessage: {
        id: "m9",
        content: "The school concert will be held on the 15th of this month.",
        createdAt: "2024-08-30T14:20:00Z",
      },
      newMessages: 1,
    },
    {
      id: "10",
      name: "Jasmine Lee",
      imageUri: "https://example.com/jasmine.jpg",
      lastMessage: {
        id: "m10",
        content: "Class pictures will be taken on Wednesday.",
        createdAt: "2024-09-01T13:00:00Z",
      },
      newMessages: 4,
    },
    {
      id: "11",
      name: "Kevin Brown",
      imageUri: "https://example.com/kevin.jpg",
      lastMessage: {
        id: "m11",
        content: "Reminder: School fees are due by the end of the month.",
        createdAt: "2024-09-02T08:15:00Z",
      },
      newMessages: 0,
    },
    {
      id: "12",
      name: "Lily Green",
      imageUri: "https://example.com/lily.jpg",
      lastMessage: {
        id: "m12",
        content: "Graduation ceremony details have been sent to your email.",
        createdAt: "2024-09-01T19:45:00Z",
      },
      newMessages: 3,
    },
    {
      id: "13",
      name: "Matthew Scott",
      imageUri: "https://example.com/matthew.jpg",
      lastMessage: {
        id: "m13",
        content: "Soccer practice will be held at 4 PM tomorrow.",
        createdAt: "2024-09-01T15:30:00Z",
      },
      newMessages: 5,
    },
    {
      id: "14",
      name: "Nina Adams",
      imageUri: "https://example.com/nina.jpg",
      lastMessage: {
        id: "m14",
        content: "Individualized education plans have been updated.",
        createdAt: "2024-09-01T11:20:00Z",
      },
      newMessages: 1,
    },
    {
      id: "15",
      name: "Oliver Taylor",
      imageUri: "https://example.com/oliver.jpg",
      lastMessage: {
        id: "m15",
        content: "Art supplies will be provided for the upcoming workshop.",
        createdAt: "2024-08-30T17:00:00Z",
      },
      newMessages: 7,
    },
    {
      id: "16",
      name: "Penny Johnson",
      imageUri: "https://example.com/penny.jpg",
      lastMessage: {
        id: "m16",
        content: "The annual school carnival is scheduled for next month.",
        createdAt: "2024-08-31T22:30:00Z",
      },
      newMessages: 2,
    },
    {
      id: "17",
      name: "Quinn Harris",
      imageUri: "https://example.com/quinn.jpg",
      lastMessage: {
        id: "m17",
        content: "Flu shots will be available next week for students.",
        createdAt: "2024-08-29T13:50:00Z",
      },
      newMessages: 4,
    },
    {
      id: "18",
      name: "Rachel Lewis",
      imageUri: "https://example.com/rachel.jpg",
      lastMessage: {
        id: "m18",
        content: "Bus routes have been updated for the new school year.",
        createdAt: "2024-09-02T09:30:00Z",
      },
      newMessages: 3,
    },
    {
      id: "19",
      name: "Sam Carter",
      imageUri: "https://example.com/sam.jpg",
      lastMessage: {
        id: "m19",
        content: "Join the next PTA meeting to discuss school improvements.",
        createdAt: "2024-09-01T12:00:00Z",
      },
      newMessages: 2,
    },
    {
      id: "20",
      name: "Tina Evans",
      imageUri: "https://example.com/tina.jpg",
      lastMessage: {
        id: "m20",
        content: "Important: Check the school website for updates.",
        createdAt: "2024-09-01T20:00:00Z",
      },
      newMessages: 6,
    },
  ];
  
 export const messageData: MessageData = {
    name: 'Chat Title',
    messages: [
      // Existing messages
      {
        id: '1',
        content: 'Hello, how are you? ipsum dolor sit amet consectetur adipisicing elit. Impedit ex mollitia, in quas natus, perferendis officiis suscipit reprehenderit excepturi atque laborum dolorem veniam obcaecati optio, adipisci accusantium beatae. Ab sit blanditiis odio repellat quo cumque vel, magni aperiam aliquam adipisci! ',
        replies: [
          { id: '1-1', content: 'I am good, thanks!' },
          { id: '1-2', content: 'How about you?' },
          { id: '1-3', content: 'Do you have any plans for the weekend?' }
        ]
      },
      {
        id: '2',
        content: 'What are you up to today?',
        replies: [
          { id: '2-1', content: 'Just working on a project.' },
          { id: '2-2', content: 'Later, I plan to go for a walk.' }
        ]
      },
      {
        id: '3',
        content: 'Have you seen the latest movie?',
        replies: [
          { id: '3-1', content: 'Yes, I watched it last night.' },
          { id: '3-2', content: 'It was amazing! What did you think?' },
          { id: '3-3', content: 'I haven\'t seen it yet. Was it good?' }
        ]
      },
      {
        id: '4',
        content: 'What’s your favorite cuisine?',
        replies: [
          { id: '4-1', content: 'I love Italian food!' },
          { id: '4-2', content: 'Mexican is my favorite.' },
          { id: '4-3', content: 'I enjoy a good sushi as well.' }
        ]
      },
      {
        id: '5',
        content: 'Any new hobbies lately?',
        replies: [
          { id: '5-1', content: 'I’ve started learning guitar you? ipsum dolor sit amet consectetur adipisicing elit. Impedit ex mollitia, in quas natus, perferendis officiis suscipit reprehenderit excepturi atque laborum dolorem veniam obcaecati optio, adipisci accusantium beatae. Ab sit blanditiis odio repellat quo cumque vel,.' },
          { id: '5-2', content: 'I’ve been trying my hand at painting.' }
        ]
      },
      // Additional messages
      {
        id: '6',
        content: 'What’s the weather like today?',
        replies: [
          { id: '6-1', content: 'It’s sunny and warm.' },
          { id: '6-2', content: 'Expecting some rain later.' }
        ]
      },
      {
        id: '7',
        content: 'Have you read any good books recently?',
        replies: [
          { id: '7-1', content: 'Yes, I just finished a thriller novel.' },
          { id: '7-2', content: 'I’m currently reading a sci-fi book.' }
        ]
      },
      {
        id: '8',
        content: 'What did you have for breakfast?',
        replies: [
          { id: '8-1', content: 'I had pancakes and coffee.' },
          { id: '8-2', content: 'Just a smoothie today.' }
        ]
      },
      {
        id: '9',
        content: 'Any plans for the upcoming holiday?',
        replies: [
          { id: '9-1', content: 'Planning a family trip to the mountains.' },
          { id: '9-2', content: 'Thinking of staying home and relaxing.' }
        ]
      },
      {
        id: '10',
        content: 'Do you have a favorite sports team?',
        replies: [
          { id: '10-1', content: 'Yes, I support the local football team.' },
          { id: '10-2', content: 'I’m a fan of the basketball league.' }
        ]
      },
      {
        id: '11',
        content: 'What kind of music do you enjoy?',
        replies: [
          { id: '11-1', content: 'I enjoy classical music.' },
          { id: '11-2', content: 'I’m into rock and alternative.' }
        ]
      },
      {
        id: '12',
        content: 'Do you like cooking?',
        replies: [
          { id: '12-1', content: 'Yes, I love trying out new recipes.' },
          { id: '12-2', content: 'Not really, I prefer eating out.' }
        ]
      },
      {
        id: '13',
        content: 'What’s your favorite movie genre?',
        replies: [
          { id: '13-1', content: 'I love action movies.' },
          { id: '13-2', content: 'I prefer romantic comedies.' }
        ]
      },
      {
        id: '14',
        content: 'Have you traveled anywhere interesting lately?',
        replies: [
          { id: '14-1', content: 'Yes, I went to Japan last month.' },
          { id: '14-2', content: 'Not recently, but I’m planning a trip soon.' }
        ]
      },
      {
        id: '15',
        content: 'What’s your favorite way to relax?',
        replies: [
          { id: '15-1', content: 'I like to read a good book.' },
          { id: '15-2', content: 'Watching movies is my favorite.' }
        ]
      },
      {
        id: '16',
        content: 'Do you enjoy outdoor activities?',
        replies: [
          { id: '16-1', content: 'Yes, I love hiking and biking.' },
          { id: '16-2', content: 'Not really, I prefer indoor activities.' }
        ]
      },
      {
        id: '17',
        content: 'What’s your go-to comfort food?',
        replies: [
          { id: '17-1', content: 'Mac and cheese is my favorite.' },
          { id: '17-2', content: 'I enjoy a good bowl of soup.' }
        ]
      },
      {
        id: '18',
        content: 'What kind of pets do you have?',
        replies: [
          { id: '18-1', content: 'I have a dog and a cat.' },
          { id: '18-2', content: 'No pets, but I’m thinking of getting a cat.' }
        ]
      },
      {
        id: '19',
        content: 'What’s the best meal you’ve ever had?',
        replies: [
          { id: '19-1', content: 'A seafood platter in a coastal town.' },
          { id: '19-2', content: 'Homemade lasagna from my grandma.' }
        ]
      },
      {
        id: '20',
        content: 'Do you prefer summer or winter?',
        replies: [
          { id: '20-1', content: 'I prefer summer for the warm weather.' },
          { id: '20-2', content: 'Winter is my favorite, I love snow.' }
        ]
      },
      {
        id: '21',
        content: 'What’s your favorite season?',
        replies: [
          { id: '21-1', content: 'Spring is my favorite season.' },
          { id: '21-2', content: 'I love autumn with the changing leaves.' }
        ]
      },
      {
        id: '22',
        content: 'Do you have a favorite holiday?',
        replies: [
          { id: '22-1', content: 'Christmas is my favorite holiday.' },
          { id: '22-2', content: 'I really enjoy celebrating New Year\'s.' }
        ]
      },
      {
        id: '23',
        content: 'What’s your favorite sport to watch?',
        replies: [
          { id: '23-1', content: 'I love watching soccer.' },
          { id: '23-2', content: 'Basketball is my go-to sport.' }
        ]
      },
      {
        id: '24',
        content: 'Do you enjoy visiting museums?',
        replies: [
          { id: '24-1', content: 'Yes, I love art museums.' },
          { id: '24-2', content: 'Not really, I prefer other activities.' }
        ]
      },
      {
        id: '25',
        content: 'What’s your favorite type of dessert?',
        replies: [
          { id: '25-1', content: 'Chocolate cake is the best.' },
          { id: '25-2', content: 'I enjoy a good fruit tart.' }
        ]
      }
    ]
  };
