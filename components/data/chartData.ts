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
    name: 'School Admin - Parent Chat',
    messages: [
      {
        id: '1',
        content: 'Hello, this is the school administrator. I hope you’re doing well. I wanted to check in regarding your child’s progress.',
        replies: [
          { id: '1-1', content: 'Hello, I’m doing well, thank you!' },
          { id: '1-2', content: 'I appreciate you reaching out. How is my child doing in class?' },
          { id: '1-3', content: 'Is there anything I should be aware of?' }
        ]
      },
      {
        id: '2',
        content: 'Your child is doing well academically, but there are a few areas where we think they could use some improvement, particularly in math.',
        replies: [
          { id: '2-1', content: 'Thank you for letting me know. Is there any additional support available?' },
          { id: '2-2', content: 'I’ve noticed the same. We’ve been working on math at home as well.' }
        ]
      },
      {
        id: '3',
        content: 'We have some extra math tutoring sessions available after school. Would you be interested in enrolling your child?',
        replies: [
          { id: '3-1', content: 'Yes, I think that would be very helpful.' },
          { id: '3-2', content: 'That sounds great! How do I sign up?' }
        ]
      },
      {
        id: '4',
        content: 'You can sign up through our parent portal, or I can send the registration form directly to you.',
        replies: [
          { id: '4-1', content: 'I’ll sign up through the portal, thank you!' },
          { id: '4-2', content: 'Could you send me the form? I’ll fill it out as soon as possible.' }
        ]
      },
      {
        id: '5',
        content: 'Also, the parent-teacher conference is coming up next week. Would you be available to attend?',
        replies: [
          { id: '5-1', content: 'Yes, I’ll be there. What time works best for the meeting?' },
          { id: '5-2', content: 'Unfortunately, I’m not available next week. Is there another time we can meet?' }
        ]
      },
      {
        id: '6',
        content: 'The conference is scheduled between 2 PM and 5 PM. I can adjust the time to fit your availability if necessary.',
        replies: [
          { id: '6-1', content: '2 PM works for me. I’ll see you then.' },
          { id: '6-2', content: 'I’m free after 3 PM. Could we schedule for then?' }
        ]
      },
      {
        id: '7',
        content: 'Of course! I’ll put you down for a 3:30 PM meeting next week. I look forward to discussing your child’s progress in more detail.',
        replies: [
          { id: '7-1', content: 'Thank you so much! I appreciate your flexibility.' },
          { id: '7-2', content: 'Great! I’m looking forward to it.' }
        ]
      },
      {
        id: '8',
        content: 'One last thing, the school is organizing a field trip in a few weeks. We will send out permission slips soon. Please keep an eye out for that.',
        replies: [
          { id: '8-1', content: 'I’ll make sure to fill out the form as soon as I receive it.' },
          { id: '8-2', content: 'Sounds exciting! I’ll be on the lookout for the permission slip.' }
        ]
      },
      {
        id: '9',
        content: 'Thank you for your time! Please let me know if you have any other questions or concerns.',
        replies: [
          { id: '9-1', content: 'Thank you! I will reach out if anything comes up.' },
          { id: '9-2', content: 'I appreciate your help. Have a great day!' }
        ]
      }
    ]
  };
  
