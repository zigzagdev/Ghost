import setupGhostApi from '../../src/utils/api';

afterEach(() => {
  vi.restoreAllMocks();
});

test('calls settings endpoint on init', async () => {
  const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValueOnce(
    Response.json({
      announcement: [
        {
          announcement_content: '<p>Test announcement</p>',
          announcement_background: 'dark',
        },
      ],
    }),
  );

  const api = setupGhostApi({
    apiUrl: 'http://localhost/members/api/announcement/',
  });

  await api.init();

  expect(fetchSpy).toHaveBeenCalledTimes(1);
  expect(fetchSpy).toHaveBeenCalledWith(
    'http://localhost/members/api/announcement/',
    expect.objectContaining({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: undefined,
      body: undefined,
    }),
  );
});

test('rejects without fetching when there is no API URL', async () => {
  const fetchSpy = vi.spyOn(window, 'fetch');

  const api = setupGhostApi({});

  await expect(api.init()).rejects.toThrow('Missing announcement API URL');
  expect(fetchSpy).not.toHaveBeenCalled();
});
