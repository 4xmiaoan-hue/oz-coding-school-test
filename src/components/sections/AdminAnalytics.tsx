import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

type Row = {
  id: string;
  email: string;
  source: string | null;
  source_label: '출시 알람 신청' | '얼리버드 신청' | null;
  created_at: string;
}

const labels = ['전체', '출시 알람 신청', '얼리버드 신청'] as const;

export const AdminAnalytics: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<typeof labels[number]>('전체');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('early_bird_emails')
        .select('id,email,source,source_label,created_at')
        .order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setRows((data ?? []) as Row[]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (filter === '전체') return rows;
    return rows.filter(r => r.source_label === filter);
  }, [rows, filter]);

  const stats = useMemo(() => {
    const launch = rows.filter(r => r.source_label === '출시 알람 신청').length;
    const early = rows.filter(r => r.source_label === '얼리버드 신청').length;
    const total = rows.length;
    return { launch, early, total };
  }, [rows]);

  const maxCount = Math.max(stats.launch, stats.early, 1);

  return (
    <section className="w-full py-16 flex justify-center bg-gray-50/50">
      <div className="w-full max-w-[1040px] px-5 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="px-3 py-1 border-primary/20 text-primary bg-primary/5">Admin</Badge>
          <h2 className="text-2xl font-bold tracking-tight">유입 경로 통계</h2>
          <p className="text-sm text-gray-600">버튼별 이메일 유입 현황을 확인하세요.</p>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">필터</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {labels.map(l => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${filter === l ? 'bg-[#92302E] text-white border-[#92302E]' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {l}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                <div className="text-xs text-gray-500 mb-1">출시 알람 신청</div>
                <div className="text-2xl font-bold">{stats.launch}</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                <div className="text-xs text-gray-500 mb-1">얼리버드 신청</div>
                <div className="text-2xl font-bold">{stats.early}</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                <div className="text-xs text-gray-500 mb-1">총합</div>
                <div className="text-2xl font-bold">{stats.total}</div>
              </div>
            </div>

            <div className="mt-2 p-4 bg-white rounded-xl border border-gray-100">
              <div className="flex items-end gap-6 h-40">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 bg-[#92302E] rounded-md" style={{ height: `${(stats.launch / maxCount) * 100}%` }} />
                  <span className="text-xs text-gray-600">출시</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 bg-[#7a2826] rounded-md" style={{ height: `${(stats.early / maxCount) * 100}%` }} />
                  <span className="text-xs text-gray-600">얼리버드</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">데이터</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <div className="text-sm text-gray-500">불러오는 중...</div>}
            {error && <div className="text-sm text-red-500">오류: {error}</div>}
            {!loading && filtered.length === 0 && <div className="text-sm text-gray-500">데이터가 없습니다.</div>}
            <div className="space-y-2">
              {filtered.map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">{r.email}</span>
                    <span className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()} · {r.source ?? '/'}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full border border-gray-200">
                    {r.source_label ?? '출시 알람 신청'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

