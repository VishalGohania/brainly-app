import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  },[modalOpen])

  return (
    <div>
      <Sidebar/>
      <div className='p-4 ml-72 bg-gray-100 min-h-screen border-2'> 
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }}/>
        <div className='flex justify-end gap-4'>
          <Button onClick={() => setModalOpen(true)} startIcon={<PlusIcon size={'md'}/>} size='md' variant='primary' text='Add content'/>
          <Button startIcon={<ShareIcon size={'md'} />} size='lg' variant='secondary' text='Share brain'/>
        </div> 
        <div className='flex gap-4 flex-wrap'>
          {contents.map(({title, link, type}) => <Card 
          key={title}
          title={title || "Untitled"} 
          link={link} 
          type={type}
          /> 
        )}   
        </div>    

      </div>
    </div>
  )
}

export default Dashboard
