"use client";

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { recordVisit } from '@/app/actions';

export default function VisitorTracker() {
  useEffect(() => {
    // Record visit if not recorded this session
    if (!sessionStorage.getItem('tmhse_visited')) {
      recordVisit();
      sessionStorage.setItem('tmhse_visited', 'true');
    }

    // Generate a unique ID for this browser tab/session
    const visitorId = 'visitor_' + uuidv4();
    
    const channel = supabase.channel('online-visitors', {
      config: {
        presence: {
          key: visitorId,
        },
      },
    });

    channel.on('presence', { event: 'sync' }, () => {
      // presence synced
    }).subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ online_at: new Date().toISOString() });
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
