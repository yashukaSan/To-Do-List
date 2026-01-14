import { useState } from 'react';

const AddSection = ({ setTitle, setDesc, addInContent, onCancel }) => {
    return (
        <div id="addSection" className="grid gap-2 justify-center bg-yellow-800 p-3">
            <label className="grid grid-cols-2 justify-center">
                <h3>Enter Title: </h3>
                <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title Here" className="border text-center" required />
            </label>
            <label className="grid grid-cols-2 justify-center">
                <h4>Enter Description: </h4>
                <textarea onChange={(e) => setDesc(e.target.value)} className="border overflow-auto" placeholder="Enter Details"></textarea>
            </label>
            <div className="flex justify-around">
                <button onClick={addInContent} className="border w-25 bg-red-200 font-bold text-black p-2 rounded-3xl">ADD</button>
                <button onClick={onCancel} className="border p-2 bg-red-200 font-bold text-black w-25 rounded-3xl">CANCEL</button>
            </div>
        </div>
    );
}

export function Body() {
    const [contentList, setContentList] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    function addInContent() {
        if (!title.trim()) {
            alert('Title Cannot be Empty');
            return;
        }
        // Update state with 2D array [title, desc]
        console.log(title, desc);
        setContentList(prevList => [...prevList, [title.trim(), desc.trim()]]);

        // Reset inputs
        setTitle('');
        setDesc('');
        setShowAdd(false);
    }

    function deleteBtn(ind){
        const lst = contentList.filter((_, i) => i !== ind);
        setContentList(lst);
    }

    return (
        <>
            <div id="upperTitle" className="flex justify-around bg-blue-200 text-purple-900 font-extrabold p-2">
                <button onClick={() => setShowAdd(true)} className="border-4 w-[40%] p-1 hover:bg-purple-900 hover:text-blue-200">
                    ADD TASK
                </button>
                <button onClick={() => setContentList([])} className="border-4 w-[40%] p-1 hover:bg-purple-900 hover:text-blue-200">
                    CLEAR ALL
                </button>
            </div>

            {showAdd && (
                <AddSection
                    setTitle={setTitle}
                    setDesc={setDesc}
                    addInContent={addInContent}
                    onCancel={() => setShowAdd(false)}
                />
            )}

            <div className="p-4 grid gap-4">
                {contentList.map((task, index) => (
                    <div key={index} className="grid grid-cols-[60vw_10vw] gap-10 justify-center border-4 border-yellow-600 p-3 bg-white rounded-lg">
                        <div>
                            <h3 className="font-bold text-xl text-blue-700">{task[0]}</h3>
                            <p className="text-gray-700">{task[1]}</p>
                        </div>
                        <button onClick={() => deleteBtn(index)} className="cursor-pointer p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
