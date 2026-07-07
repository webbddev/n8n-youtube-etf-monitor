import { Dashboard } from '@/components/dashboard';
import Project from '@/components/Project';
import ProjectFull from '@/components/ProjectFull';

export default function Home() {
  return (
    <>
      <Dashboard />
      <Project />
      <ProjectFull />
    </>
  );
}
