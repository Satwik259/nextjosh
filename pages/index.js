// // pages/index.js
// import dynamic from 'next/dynamic';
// import Head from 'next/head';

// // Dynamic import for the TaskManager component (Client-side only)
// const TaskManager = dynamic(() => import('../components/TaskManager'), { ssr: false });

// export async function getServerSideProps() {
//   const initialTasks = [
//     { title: "Complete project report", description: "Finish by Monday", priority: "high", completed: false },
//     { title: "Grocery shopping", description: "Buy vegetables and fruits", priority: "medium", completed: false },
//     { title: "Car wash", description: "Take the car to the car wash", priority: "low", completed: true },
//   ];

//   return {
//     props: { initialTasks },
//   };
// }

// export default function Home({ initialTasks }) {
//   return (
//     <div className="container mx-auto p-4">
//       <Head>
//         <title>Task Manager</title>
//         <meta name="description" content="A Task Management App" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <h1 className="text-center text-3xl font-bold my-6">Task Management App</h1>
//       <TaskManager initialTasks={initialTasks} />
//     </div>
//   );
// }

// pages/index.js
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Dynamic import for the TaskManager component (Client-side only)
const TaskManager = dynamic(() => import('../components/TaskManager'), { ssr: false });

export async function getServerSideProps() {
  const initialTasks = [
    { title: "Complete project report", description: "Finish by Monday", priority: "high", completed: false },
    { title: "Grocery shopping", description: "Buy vegetables and fruits", priority: "medium", completed: false },
    { title: "Car wash", description: "Take the car to the car wash", priority: "low", completed: true },
  ];

  return {
    props: { initialTasks },
  };
}

export default function Home({ initialTasks }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="A Task Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-white shadow-md py-4">
        <h1 className="text-center text-4xl font-bold text-gray-800">Task Management App</h1>
      </header>
      <main className="container mx-auto p-4 flex-grow">
        <TaskManager initialTasks={initialTasks} />
      </main>
      <footer className="bg-white shadow-md py-4 mt-4">
        <p className="text-center text-gray-600">© 2024 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}
