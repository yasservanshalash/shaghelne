import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faInbox, 
  faStar, 
  faArchive,
  faTrash,
  faCircle,
  faSearch,
  faReply,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

const MessagesDashboard = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.user);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: 'أحمد محمد',
      senderAvatar: '',
      subject: 'استفسار عن المشروع',
      preview: 'مرحبًا، أود الاستفسار عن تفاصيل المشروع الذي تم الاتفاق عليه سابقًا...',
      date: '2024-03-28',
      read: false,
      folder: 'inbox',
      fullMessage: 'مرحبًا، أود الاستفسار عن تفاصيل المشروع الذي تم الاتفاق عليه سابقًا. هل هناك أي تحديثات جديدة؟ وهل يمكنك تزويدي بجدول زمني محدث للمشروع؟ أتطلع للتعاون معك. شكرًا!',
    },
    {
      id: 2,
      sender: 'سارة علي',
      senderAvatar: '',
      subject: 'عرض عمل جديد',
      preview: 'مرحبًا، أود أن أعرض عليك فرصة عمل جديدة في مجال تطوير الويب...',
      date: '2024-03-20',
      read: true,
      folder: 'inbox',
      fullMessage: 'مرحبًا، أود أن أعرض عليك فرصة عمل جديدة في مجال تطوير الويب. المشروع عبارة عن تطوير موقع تجارة إلكترونية باستخدام React و Node.js. مدة المشروع 3 أشهر بميزانية جيدة. إذا كنت مهتمًا، يرجى الرد على هذه الرسالة في أقرب وقت ممكن. شكرًا لك!',
    },
    {
      id: 3,
      sender: 'محمد خالد',
      senderAvatar: '',
      subject: 'شكر وتقدير',
      preview: 'أود أن أشكرك على الجهود المبذولة في المشروع الأخير. كان العمل رائعًا...',
      date: '2024-03-15',
      read: true,
      folder: 'starred',
      fullMessage: 'أود أن أشكرك على الجهود المبذولة في المشروع الأخير. كان العمل رائعًا والنتائج متميزة. تعاملك الاحترافي والتزامك بالمواعيد كان محل تقدير كبير من جانبنا. نتطلع للتعاون معك في مشاريع مستقبلية. مع خالص التقدير والاحترام.',
    },
    {
      id: 4,
      sender: 'فاطمة أحمد',
      senderAvatar: '',
      subject: 'تحديث حالة المشروع',
      preview: 'أكتب إليك لإبلاغك بآخر تحديثات المشروع. لقد تم الانتهاء من المرحلة الأولى...',
      date: '2024-03-10',
      read: true,
      folder: 'archive',
      fullMessage: 'أكتب إليك لإبلاغك بآخر تحديثات المشروع. لقد تم الانتهاء من المرحلة الأولى بنجاح، ونحن الآن بصدد البدء في المرحلة الثانية. هناك بعض التغييرات الطفيفة في المتطلبات، سأرسل لك التفاصيل في ملف منفصل. نحن نسير وفق الجدول الزمني المتفق عليه.',
    },
  ];

  const filteredMessages = messages.filter(message => {
    if (activeFolder === 'inbox') return message.folder === 'inbox';
    if (activeFolder === 'starred') return message.folder === 'starred';
    if (activeFolder === 'sent') return message.folder === 'sent';
    if (activeFolder === 'archive') return message.folder === 'archive';
    return true;
  });

  const handleMessageSelect = (messageId) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter(id => id !== messageId));
    } else {
      setSelectedMessages([...selectedMessages, messageId]);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(m => m.id));
    }
  };

  const getFolderCount = (folder) => {
    return messages.filter(message => message.folder === folder).length;
  };

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">الرسائل</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">إدارة الرسائل والمحادثات</p>
        </div>
      </div>

      {/* Messages Content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 border-l border-gray-200">
            <div className="p-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center">
                <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                رسالة جديدة
              </button>
              
              <div className="mt-4 relative">
                <input 
                  type="text" 
                  placeholder="بحث في الرسائل..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pr-10"
                />
                <div className="absolute inset-y-0 left-0 pr-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <nav className="mt-2 space-y-1 p-4">
              <button
                onClick={() => setActiveFolder('inbox')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                  activeFolder === 'inbox'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faInbox} className="ml-3 h-4 w-4" />
                  صندوق الوارد
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
                  {getFolderCount('inbox')}
                </span>
              </button>
              <button
                onClick={() => setActiveFolder('starred')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                  activeFolder === 'starred'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faStar} className="ml-3 h-4 w-4" />
                  مميز بنجمة
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">
                  {getFolderCount('starred')}
                </span>
              </button>
              <button
                onClick={() => setActiveFolder('sent')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                  activeFolder === 'sent'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPaperPlane} className="ml-3 h-4 w-4" />
                  المرسلة
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                  {getFolderCount('sent')}
                </span>
              </button>
              <button
                onClick={() => setActiveFolder('archive')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                  activeFolder === 'archive'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faArchive} className="ml-3 h-4 w-4" />
                  الأرشيف
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                  {getFolderCount('archive')}
                </span>
              </button>
            </nav>
          </div>
          
          {/* Messages area */}
          <div className="w-full md:w-3/4 border-t md:border-t-0 md:border-r border-gray-200">
            {!selectedMessage ? (
              <>
                {/* Message list toolbar */}
                <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ml-2"
                      checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                      onChange={handleSelectAll}
                    />
                    <button className="text-gray-500 p-2 hover:text-gray-700">
                      <FontAwesomeIcon icon={faArchive} />
                    </button>
                    <button className="text-gray-500 p-2 hover:text-gray-700">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <div>
                    <select className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option>الأحدث</option>
                      <option>الأقدم</option>
                      <option>غير مقروءة</option>
                    </select>
                  </div>
                </div>
                
                {/* Message list */}
                {filteredMessages.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}
                        onClick={() => handleMessageClick(message)}
                      >
                        <div className="flex items-start">
                          <div className="flex items-center h-5 ml-3">
                            <input
                              type="checkbox"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              checked={selectedMessages.includes(message.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleMessageSelect(message.id);
                              }}
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-900 flex items-center">
                                {!message.read && (
                                  <FontAwesomeIcon icon={faCircle} className="text-blue-500 ml-2 text-xs" />
                                )}
                                {message.sender}
                              </div>
                              <div className="text-sm text-gray-500">{message.date}</div>
                            </div>
                            <div className="font-medium text-gray-800 mt-1">{message.subject}</div>
                            <div className="text-sm text-gray-500 mt-1 truncate">{message.preview}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64">
                    <FontAwesomeIcon icon={faInbox} className="text-gray-400 text-5xl mb-4" />
                    <p className="text-gray-500 text-lg">لا توجد رسائل في هذا المجلد</p>
                  </div>
                )}
              </>
            ) : (
              /* Message detail view */
              <div className="h-full flex flex-col">
                <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedMessage(null)}
                  >
                    العودة للرسائل
                  </button>
                  <div>
                    <button className="text-gray-500 p-2 hover:text-gray-700">
                      <FontAwesomeIcon icon={faArchive} />
                    </button>
                    <button className="text-gray-500 p-2 hover:text-gray-700">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="text-gray-500 p-2 hover:text-gray-700">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-grow p-6 overflow-auto">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                    <div className="flex justify-between mt-2">
                      <div>
                        <span className="font-medium">من: </span>
                        {selectedMessage.sender}
                      </div>
                      <div className="text-gray-500">{selectedMessage.date}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-gray-800 whitespace-pre-line">
                    {selectedMessage.fullMessage}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                    <FontAwesomeIcon icon={faReply} className="ml-2" />
                    الرد
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesDashboard; 