export const  NavBox = [
  {
    title: "Calendar",
    icon: "calendar-alt",
    screen: "calendar/calendar",
    type:["teacher","parent","admin"]
  },
  {
    title: "Announcement",
    icon: "comments",
    screen: "communication/chart",
    type:["teacher","parent","admin"]

  },
  {
    title: "Maps",
    icon: "map",
    screen: "map/map",
    type:["admin","transport"]

  },
  {
    title: "Settings",
    icon: "cog",
    screen: "setting/setting",
  

  },
  {
    title: "Teacher",
    icon: "chalkboard-teacher",

    screen: "SwitchForm/teacher",
    type:["teacher","admin"]

  },
  {
    title: "My Kids",
    icon: "chalkboard-teacher",

    screen: "SwitchForm/parent",
    type:["parent"]

  },

  {
    title: "Transport",
    icon: "bus-alt",

    screen: "SwitchForm/transport",
    type:["transport"]

  },
  {
    title: "Parents",
    icon: "hand-holding-heart",
    

    screen: "table/table",
    type:[  "admin"]

  },
  {
    title: "Create",
    icon: "address-card",

    screen: "auth/signup",
    type:["teacher","admin"]

  },
  {
    title: "Sign In",
    icon: "address-card",

    screen: "auth/signin",
    

  },
  {
    title: "Sign Out",
    icon: "address-card",
  },
];

export const screens = [
  { name: "map/map", title: "Students Location" },  
  { name: "calendar/calendar", title: "Event Calendar" },
  { name: "communication/chart", title: "Announcement" },
  { name: "communication/viewChart", title: "Chart" },
 // { name: "SwitchForm/teacher", title: "Teachers" },
  { name: "SwitchForm/transport", title: "Transports" },
  { name: "SwitchForm/notification", title: "Notification" },
  { name: "SwitchForm/parent", title: "My Kids" },
  { name: "auth/signup", title: "Registration" },
  { name: "auth/signin", title: "Sign In" },
  { name: "setting/setting", title: "Settings" },
  { name: "notification/notification", title: "Notification" },


];
