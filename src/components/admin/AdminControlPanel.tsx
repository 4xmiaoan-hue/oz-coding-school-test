import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, X } from 'lucide-react';
import { useUiSettingsStore } from '../../store/uiSettings';
import { Button } from '../ui/button';

export const AdminControlPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isReportPreviewVisible, toggleReportPreviewVisibility } = useUiSettingsStore();

  // Simple admin check: Check for query param ?admin=true or localStorage 'isAdmin'
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    } else if (localStorage.getItem('isAdmin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 p-4 bg-white rounded-xl shadow-xl border border-gray-200 w-64 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-sm">관리자 컨트롤 패널</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">리포트 프리뷰 섹션</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleReportPreviewVisibility}
                className={`h-8 px-3 gap-2 ${isReportPreviewVisible ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500'}`}
              >
                {isReportPreviewVisible ? (
                  <>
                    <Eye size={14} />
                    <span>표시 중</span>
                  </>
                ) : (
                  <>
                    <EyeOff size={14} />
                    <span>숨김</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
        title="관리자 설정"
      >
        <Settings size={20} />
      </button>
    </div>
  );
};
