import React from 'react';
import { createClient } from '@/lib/supabase-server';
import LeaderboardClient from './LeaderboardClient';

export const revalidate = 30;

async function getFullLeaderboard() {
    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('user_stats')
            .select('*')
            .order('total_solved', { ascending: false })
            .limit(100);
        return data || [];
    } catch (e) {
        return [];
    }
}

export default async function LeaderboardPage() {
    const leaderboard = await getFullLeaderboard();

    return <LeaderboardClient leaderboard={leaderboard} />;
}
