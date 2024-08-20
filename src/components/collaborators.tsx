import { ICollaborators } from "../types/components/collaborators";

export default function Collaborators({ list }: ICollaborators) {
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {list.map((collaborator, index) => (
        <div key={index}>
          <img
            className="w-10 h-10 border-2 rounded-full border-gray-200"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt=""
          />
        </div>
      ))}

      <a
        className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
        href="#"
      >
        +99
      </a>
    </div>
  );
}
