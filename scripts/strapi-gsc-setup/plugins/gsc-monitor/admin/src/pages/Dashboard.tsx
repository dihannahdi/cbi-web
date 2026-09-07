import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Typography,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Tabs,
  Grid,
} from '@strapi/design-system';
import { useFetchClient } from '@strapi/admin/strapi-admin';

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */
const StatCard = ({
  label,
  value,
  bg,
}: {
  label: string;
  value: string | number;
  bg?: string;
}) => (
  <Box
    background={bg || 'neutral0'}
    padding={5}
    hasRadius
    borderColor="neutral200"
    style={{ border: '1px solid #dcdce4', textAlign: 'center' as const }}
  >
    <Typography
      variant="sigma"
      textColor="neutral600"
      style={{ fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}
    >
      {label}
    </Typography>
    <Box marginTop={1}>
      <Typography variant="alpha" textColor="neutral800">
        {value}
      </Typography>
    </Box>
  </Box>
);

/* ------------------------------------------------------------------ */
/*  Index status badge                                                 */
/* ------------------------------------------------------------------ */
const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'indexed') {
    return (
      <Badge
        backgroundColor="success100"
        textColor="success700"
        style={{ padding: '2px 8px' }}
      >
        ✅ Indexed
      </Badge>
    );
  }
  if (status === 'discovered') {
    return (
      <Badge
        backgroundColor="warning100"
        textColor="warning700"
        style={{ padding: '2px 8px' }}
      >
        ⏳ Discovered
      </Badge>
    );
  }
  return (
    <Badge
      backgroundColor="neutral150"
      textColor="neutral700"
      style={{ padding: '2px 8px' }}
    >
      ❌ Not Indexed
    </Badge>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Dashboard                                                     */
/* ------------------------------------------------------------------ */
const Dashboard = () => {
  const { get } = useFetchClient();
  const [articles, setArticles] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await get('/gsc-monitor/dashboard-data');
        setArticles(data?.articles || []);
        setQueries(data?.queries || []);
        setLogs(data?.logs || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [get]);

  if (loading) {
    return (
      <Box padding={8} background="neutral100" style={{ minHeight: '80vh' }}>
        <Flex justifyContent="center" alignItems="center" style={{ minHeight: '40vh' }}>
          <Typography variant="beta" textColor="neutral600">
            Loading GSC monitoring data...
          </Typography>
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={8} background="neutral100">
        <Box background="danger100" padding={4} hasRadius>
          <Typography textColor="danger700">Error: {error}</Typography>
          <Typography variant="omega" textColor="neutral600" style={{ marginTop: '8px' }}>
            Make sure the GSC monitoring script has been run at least once to populate data.
          </Typography>
        </Box>
      </Box>
    );
  }

  /* ---------- Compute summary stats ---------- */
  const totalArticles = articles.length;
  const indexedCount = articles.filter((a) => a.index_status === 'indexed').length;
  const discoveredCount = articles.filter((a) => a.index_status === 'discovered').length;
  const totalClicks = articles.reduce((s, a) => s + (a.clicks_28d || 0), 0);
  const totalImpressions = articles.reduce((s, a) => s + (a.impressions_28d || 0), 0);
  const avgCtr =
    totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const articlesWithPos = articles.filter((a) => (a.avg_position_28d || 0) > 0);
  const avgPosition =
    articlesWithPos.length > 0
      ? (
          articlesWithPos.reduce((s, a) => s + a.avg_position_28d, 0) / articlesWithPos.length
        ).toFixed(1)
      : '-';

  const lastSync = logs.length > 0
    ? new Date(logs[0].execution_time || logs[0].createdAt).toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
      })
    : 'Never';

  return (
    <Box padding={8} background="neutral100" style={{ minHeight: '80vh' }}>
      {/* ---- Header ---- */}
      <Flex justifyContent="space-between" alignItems="center" marginBottom={6}>
        <Box>
          <Typography variant="alpha" tag="h1" style={{ color: '#1B5E20' }}>
            GSC Article Monitor
          </Typography>
          <Typography variant="epsilon" textColor="neutral600">
            Google Search Console performance data — centrabiotechindonesia.com
          </Typography>
        </Box>
        <Box>
          <Badge
            backgroundColor="primary100"
            textColor="primary700"
            style={{ padding: '4px 12px' }}
          >
            Last sync: {lastSync}
          </Badge>
        </Box>
      </Flex>

      {/* ---- Summary Stats ---- */}
      <Grid.Root gap={4} style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: '24px' }}>
        <Grid.Item col={1} s={1}>
          <StatCard label="Total Articles" value={totalArticles} />
        </Grid.Item>
        <Grid.Item col={1} s={1}>
          <StatCard label="Indexed" value={indexedCount} bg="success100" />
        </Grid.Item>
        <Grid.Item col={1} s={1}>
          <StatCard label="Discovered" value={discoveredCount} bg="warning100" />
        </Grid.Item>
        <Grid.Item col={1} s={1}>
          <StatCard label="Clicks (28d)" value={totalClicks.toLocaleString()} bg="primary100" />
        </Grid.Item>
        <Grid.Item col={1} s={1}>
          <StatCard label="Impressions" value={totalImpressions.toLocaleString()} />
        </Grid.Item>
        <Grid.Item col={1} s={1}>
          <StatCard label="Avg CTR" value={`${avgCtr}%`} />
        </Grid.Item>
      </Grid.Root>

      {/* ---- Tabs ---- */}
      <Tabs.Root defaultValue="articles">
        <Box background="neutral0" hasRadius style={{ border: '1px solid #dcdce4' }}>
          <Box padding={3} background="neutral0" style={{ borderBottom: '1px solid #eaeaef' }}>
            <Tabs.List>
              <Tabs.Trigger value="articles">
                Articles ({totalArticles})
              </Tabs.Trigger>
              <Tabs.Trigger value="queries">
                Top Queries ({queries.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="logs">
                Sync Logs ({logs.length})
              </Tabs.Trigger>
            </Tabs.List>
          </Box>

          {/* ----- Articles Tab ----- */}
          <Tabs.Content value="articles">
            <Box padding={4}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">#</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Article Title</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Focus Keyphrase</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Clicks</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Impressions</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">CTR</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Avg Pos</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Δ Clicks</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Top Query</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Status</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {articles.map((article: any, idx: number) => (
                    <Tr key={article.documentId || article.id || idx}>
                      <Td>
                        <Typography>{idx + 1}</Typography>
                      </Td>
                      <Td>
                        <Typography
                          style={{
                            maxWidth: '280px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                          }}
                          title={article.title}
                        >
                          {article.title || article.slug}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography
                          textColor="neutral600"
                          style={{
                            maxWidth: '180px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            fontSize: '12px',
                          }}
                          title={article.focus_keyphrase}
                        >
                          {article.focus_keyphrase || '-'}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography fontWeight="bold" textColor={article.clicks_28d > 0 ? 'success600' : 'neutral600'}>
                          {article.clicks_28d || 0}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography>{article.impressions_28d || 0}</Typography>
                      </Td>
                      <Td>
                        <Typography>
                          {article.ctr_28d ? `${Number(article.ctr_28d).toFixed(2)}%` : '0%'}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography>
                          {article.avg_position_28d ? Number(article.avg_position_28d).toFixed(1) : '-'}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography
                          textColor={
                            (article.delta_clicks || 0) > 0
                              ? 'success600'
                              : (article.delta_clicks || 0) < 0
                              ? 'danger600'
                              : 'neutral600'
                          }
                          fontWeight="bold"
                        >
                          {(article.delta_clicks || 0) > 0
                            ? `+${article.delta_clicks}`
                            : article.delta_clicks || 0}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography
                          textColor="neutral600"
                          style={{
                            maxWidth: '160px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            fontSize: '12px',
                          }}
                          title={article.top_query}
                        >
                          {article.top_query || '-'}
                        </Typography>
                      </Td>
                      <Td>
                        <StatusBadge status={article.index_status || 'not_published'} />
                      </Td>
                    </Tr>
                  ))}
                  {articles.length === 0 && (
                    <Tr>
                      <Td colSpan={10}>
                        <Box padding={6} style={{ textAlign: 'center' as const }}>
                          <Typography textColor="neutral600">
                            No data yet. Run the GSC monitoring script to populate.
                          </Typography>
                        </Box>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Tabs.Content>

          {/* ----- Top Queries Tab ----- */}
          <Tabs.Content value="queries">
            <Box padding={4}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">#</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Search Query</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Clicks</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Impressions</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">CTR</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Avg Position</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {queries.map((q: any, idx: number) => (
                    <Tr key={q.documentId || q.id || idx}>
                      <Td>
                        <Typography>{idx + 1}</Typography>
                      </Td>
                      <Td>
                        <Typography fontWeight="bold">{q.query}</Typography>
                      </Td>
                      <Td>
                        <Typography textColor={q.clicks > 0 ? 'success600' : 'neutral600'} fontWeight="bold">
                          {q.clicks || 0}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography>{q.impressions || 0}</Typography>
                      </Td>
                      <Td>
                        <Typography>
                          {q.ctr ? `${Number(q.ctr).toFixed(2)}%` : '0%'}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography>
                          {q.avg_position ? Number(q.avg_position).toFixed(1) : '-'}
                        </Typography>
                      </Td>
                    </Tr>
                  ))}
                  {queries.length === 0 && (
                    <Tr>
                      <Td colSpan={6}>
                        <Box padding={6} style={{ textAlign: 'center' as const }}>
                          <Typography textColor="neutral600">
                            No query data yet.
                          </Typography>
                        </Box>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Tabs.Content>

          {/* ----- Sync Logs Tab ----- */}
          <Tabs.Content value="logs">
            <Box padding={4}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">Time</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Articles</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Indexed</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Clicks</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Impressions</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">CTR</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Status</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {logs.map((log: any, idx: number) => (
                    <Tr key={log.documentId || log.id || idx}>
                      <Td>
                        <Typography>
                          {new Date(log.execution_time || log.createdAt).toLocaleString('id-ID', {
                            timeZone: 'Asia/Jakarta',
                          })}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography>{log.total_articles || 0}</Typography>
                      </Td>
                      <Td>
                        <Typography>{log.indexed_count || 0}</Typography>
                      </Td>
                      <Td>
                        <Typography fontWeight="bold">{log.total_clicks || 0}</Typography>
                      </Td>
                      <Td>
                        <Typography>{log.total_impressions || 0}</Typography>
                      </Td>
                      <Td>
                        <Typography>
                          {log.site_ctr ? `${Number(log.site_ctr).toFixed(2)}%` : '0%'}
                        </Typography>
                      </Td>
                      <Td>
                        <Badge
                          backgroundColor={log.status === 'success' ? 'success100' : 'danger100'}
                          textColor={log.status === 'success' ? 'success700' : 'danger700'}
                        >
                          {log.status === 'success' ? '✅ Success' : '❌ Failed'}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                  {logs.length === 0 && (
                    <Tr>
                      <Td colSpan={7}>
                        <Box padding={6} style={{ textAlign: 'center' as const }}>
                          <Typography textColor="neutral600">
                            No sync logs yet. The monitoring script runs daily at 6 AM.
                          </Typography>
                        </Box>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      {/* ---- Footer info ---- */}
      <Flex justifyContent="space-between" marginTop={4}>
        <Typography variant="pi" textColor="neutral500">
          Data synced from Google Search Console via automated monitoring script
        </Typography>
        <Typography variant="pi" textColor="neutral500">
          Avg Position: {avgPosition}
        </Typography>
      </Flex>
    </Box>
  );
};

export { Dashboard };
export default Dashboard;
