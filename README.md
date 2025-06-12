# Modern Todo Application

A feature-rich, responsive Todo application built with React and modern web technologies. This application combines server-side data with local storage capabilities, providing a seamless experience for managing tasks.

![Todo App Screenshot](screenshots/todo-app.png)

## Features

- ✨ Modern, responsive UI with a clean design
- 🔍 Real-time search functionality
- 🏷️ Filter todos by status (All/Active/Completed)
- 📱 Fully responsive design for all devices
- 💾 Hybrid storage (API + Local Storage)
- 🚀 Optimistic updates for a snappy UI
- 📊 Live statistics dashboard
- ♿ Accessibility features (ARIA labels, semantic HTML)
- 🎯 Pagination support
- 🔄 Real-time updates

## Technology Stack

- **Frontend Framework**: React
- **State Management**: React Query (TanStack Query)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Form Handling**: React Hook Form
- **Routing**: React Router
- **API Client**: Axios
- **Notifications**: React Hot Toast
- **Code Quality**: ESLint

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/Caisere/Altschool-secondsemester-exam.git>
cd todo-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests (when implemented)

## Architecture Decisions

### State Management

- **React Query** for server state management
- **Local Storage** for offline capabilities
- **Optimistic Updates** for better UX

### Component Structure

```
src/
├── components/         # Reusable UI components
├── api/               # API integration layer
├── utils/             # Utility functions
├── pages/             # Route pages
└── App.jsx           # Main application component
```

### Storage Strategy

The application implements a hybrid storage approach:

- Server-side storage using DummyJSON API
- Local storage for offline capabilities and quick additions
- Seamless integration between both storage types

## API Documentation

### Endpoints

#### Get Todos

```javascript
GET /todos
Query Parameters:
- limit: number (default: 10)
- skip: number (for pagination)
```

#### Add Todo

```javascript
POST /todos
Body: {
  todo: string,
  completed: boolean,
  userId: number
}
```

#### Update Todo

```javascript
PUT /todos/:id
Body: {
  todo: string,
  completed: boolean,
  userId: number
}
```

#### Delete Todo

```javascript
DELETE /todos/:id
```

## Local Storage Implementation

The application uses local storage to:

- Store newly created todos
- Maintain offline capabilities
- Provide instant updates

Local todos are identified with a `local-` prefix in their IDs.

## Features in Detail

### Search Functionality

- Real-time search across both API and local todos
- Case-insensitive matching
- Searches through todo titles

### Filtering

- **All**: Display all todos (Minimum of 10per page)
- **Active**: Show only uncompleted todos (per page)
- **Completed**: Show only completed todos (per page)

### Statistics Dashboard

- Real-time count of active todos
- Real-time count of completed todos
- Updates instantly with changes

## Known Limitations

1. Pagination currently includes local todos in the first page only (working on this!)
2. Search and filter operations are client-side only
3. No offline sync capabilities (future improvement)

## Future Improvements

1. **Offline Mode**

   - Implement service workers
   - Add offline sync capabilities

2. **Performance Optimizations**

   - Implement virtual scrolling for large lists
   - Add request caching

3. **Enhanced Features**

   - Due dates for todos
   - Categories/Tags
   - Priority levels

4. **Authentication**
   - User accounts
   - Personal todo lists

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [DummyJSON](https://dummyjson.com/) for the API
- [Shadcn/ui](https://ui.shadcn.com/) for UI components
- [TanStack Query](https://tanstack.com/query/latest) for data management
