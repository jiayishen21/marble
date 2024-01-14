import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Poll: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  const handleSubmit = () => {
    try {
      const realDate = new Date(deadline)

      axios
        .post('/api/poll/new-poll', { question, deadline: realDate, options })
        .then((res) => {
          toast.success('Successfully created poll');
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="ml-10">
      <p className="font-bold">Date</p>
      <input className="border border-black" type="date" value={deadline} onChange={(e) => handleDeadlineChange(e)} />
      <p className="font-bold">Question</p>
      <input className="border border-black" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <div>
        <button className="bg-[#b1b1b1]" onClick={() => setOptions([...options, { text: '' }])}>Add Option</button>
      </div>
      {options.map((option, index) => {
        return (
          <div key={index}>
            Option: {index}
            <input type="text" value={option.text}
              className="border border-black ml-10"
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index].text = e.target.value;
                setOptions(newOptions);
              }} />
          </div>
        )
      })}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Poll;

