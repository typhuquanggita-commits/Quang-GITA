import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/brand/app.css';
import { App } from '@/App';
import { AuthProvider, seedAccounts } from '@/lib/auth';
import { RouterProvider } from '@/lib/router';
import { getTheme, getClasses, saveClasses, getUsers } from '@/lib/store';
import type { ClassRoom } from '@/types';

/** Khởi tạo dữ liệu mẫu cho lần chạy đầu tiên. */
async function bootstrap(): Promise<void> {
  document.documentElement.setAttribute('data-theme', getTheme());
  await seedAccounts();
  if (getClasses().length === 0) {
    const users = getUsers();
    const teacher = users.find((u) => u.role === 'teacher');
    const classes: ClassRoom[] = ([6, 7, 8, 9] as const).map((g) => ({
      id: `c_${g}clc`,
      name: `Lớp ${g} CLC — MATH365`,
      grade: g,
      track: 'CHUYEN_CLC',
      teacherId: teacher?.id ?? '',
      studentIds: users.filter((u) => u.grade === g && u.role.startsWith('student')).map((u) => u.id),
    }));
    saveClasses(classes);
  }
}

bootstrap().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RouterProvider>
    </React.StrictMode>
  );
});
