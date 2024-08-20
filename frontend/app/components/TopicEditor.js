// app/components/TopicEditor.js
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const TopicEditor = ({ initialTopics, onSave }) => {
  const [topics, setTopics] = useState(initialTopics);
  const [newTopics, setNewTopics] = useState('');

  const handleAddTopics = () => {
    if (newTopics.trim() !== '') {
      const topicsToAdd = newTopics
        .split('\n')
        .map(topic => topic.trim())
        .filter(topic => topic !== '');
      setTopics([...topics, ...topicsToAdd]);
      setNewTopics('');
    }
  };

  const handleRemoveTopic = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setTopics([]);
  };

  const handleSave = () => {
    onSave(topics);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">トピック編集</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">全て削除</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>全てのトピックを削除しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。全てのトピックが削除されます。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAll}>削除する</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="space-y-2">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input 
              value={topic} 
              onChange={(e) => {
                const newTopics = [...topics];
                newTopics[index] = e.target.value;
                setTopics(newTopics);
              }}
            />
            <Button onClick={() => handleRemoveTopic(index)} variant="destructive">削除</Button>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Textarea 
          value={newTopics} 
          onChange={(e) => setNewTopics(e.target.value)}
          placeholder="新しいトピックを入力（複数行可）"
          rows={4}
        />
        <Button onClick={handleAddTopics} className="w-full">トピックを追加</Button>
      </div>
      <Button onClick={handleSave} className="w-full">保存</Button>
    </div>
  );
};

export default TopicEditor;