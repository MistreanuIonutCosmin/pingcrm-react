import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import CreateToDo from './CreateToDo';
import Pagination from '@/Shared/Pagination';
import SmallButton from "@/Shared/SmallButton";
import ConfirmModal from "@/Shared/Modals/ConfirmModal";
import {Inertia} from "@inertiajs/inertia";

const ToDos = () => {
  const { todos } = usePage().props;
  const {
    data,
    meta: { links }
  } = todos;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [todoId, setTodoId] = useState(null);

  let onConfirm = () => {
      Inertia.delete(route('todos.destroy', todoId));
  }

  return (
    <div>
      <Helmet title="Organizations" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Pomodoro Focus</h1>
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          {/* <InertiaLink
            className="btn-indigo focus:outline-none"
            href={route('organizations.create')}
          >
            <span>Create</span>
            <span className="hidden md:inline"> Organization</span>
          </InertiaLink> */}
          <CreateToDo />

        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Name</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(({ id, name, completed, phone, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <div className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none">
                        <InertiaLink
                            href={route('todos.toggleComplete', id)}
                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                        >
                            <input type="checkbox" id="scales" name="scales" defaultChecked={completed == 1} />
                        </InertiaLink>
                        <span style={{ textDecorationLine: completed == 1 ? 'line-through' : 'none' }}>{name}</span>
                        {deleted_at && (
                          <Icon
                            name="trash"
                            className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                          />
                        )}
                      </div>
                    </td>

                    <td className="border-t w-24 flex flex-row-reverse">
                      <SmallButton
                            onClick={()=> {
                                 setTodoId(id);
                                 setConfirmOpen(true);
                             }}>
                        <Icon
                            name="trash"
                            className="w-6 h-6 text-red-400 fill-current"
                        />
                      </SmallButton>


                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination links={links} />
      </div>

      <ConfirmModal
        title="Delete item?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      >
        Are you sure you want to delete this item?
      </ConfirmModal>
    </div>
  );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
ToDos.layout = page => <Layout children={page} />;

export default ToDos;
